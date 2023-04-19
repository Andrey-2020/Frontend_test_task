import React from "react";
import Card from "./Card";
import Filter from "./Filter";
import { Pagination } from "fwt-internship-uikit";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  function _handleFieldFilter(fieldName, value) {
    let parameters = Object.assign(props.parameters);
    // if (typeof fieldName === "object" && fieldName.length == 2) {
    //   parameters[fieldName[0]] = value[0];
    //   parameters[fieldName[1]] = value[1];
    // } else {
    //   parameters[fieldName] = value;
    // }
    parameters[fieldName] = value;
    props.handleCardsFilter(parameters);
  }
  function handlePageChange(currentPage) {
    _handleFieldFilter("_page", currentPage);
  }
  return (
    <main>
      <Filter
        authors={props.authors}
        locations={props.locations}
        setCreated={props.setCreated}
        parameters={props.parameters}
        setParameters={props.setParameters}
        handleFieldFilter={_handleFieldFilter}
      />
      <section>
        <ul className="places">
          {props.cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </ul>
      </section>
      <div className="pager" role="navigation">
        <Pagination
          className={"pager__content"}
          pagesAmount={props.pagesAmount}
          currentPage={props.parameters["_page"]}
          isDarkTheme={true}
          onChange={handlePageChange}
        />
      </div>
    </main>
  );
}

export default Main;
