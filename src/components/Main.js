import React from "react";
import Card from "./Card";
import Filter from "./Filter";
import { Pagination } from "fwt-internship-uikit";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Main({
  isDarkTheme,
  cards,
  authors,
  locations,
  setCreated,
  parameters,
  setParameters,
  handleCardsFilter,
  pagesAmount,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const paginationThemeClassName = `pagination ${
    isDarkTheme ? "pagination_dark" : ""
  }`;
  function _handleFieldFilter(fieldName, value) {
    let newParameters = Object.assign(parameters);
    newParameters[fieldName] = value;
    handleCardsFilter(newParameters);
  }
  function handlePageChange(currentPage) {
    _handleFieldFilter("_page", currentPage);
  }

  function _filter(list, value, anyObjectField, returnField) {
    let filter = list.filter((item) => {
      if (item[anyObjectField] === value) {
        return item.id;
      }
    });
    return filter[0][returnField];
  }

  return (
    <main>
      <Filter
        authors={authors}
        locations={locations}
        setCreated={setCreated}
        parameters={parameters}
        setParameters={setParameters}
        handleFieldFilter={_handleFieldFilter}
        isDarkTheme={isDarkTheme}
        _filter={_filter}
      />
      <section>
        <ul className="places">
          {cards.map((card) => (
            <Card
              card={card}
              key={card.id}
              isDarkTheme={isDarkTheme}
              authors={authors}
              _filter={_filter}
              locations={locations}
            />
          ))}
        </ul>
      </section>
      <div className={paginationThemeClassName} role="navigation">
        <Pagination
          className={"pagination__content"}
          pagesAmount={pagesAmount}
          currentPage={parameters["_page"]}
          isDarkTheme={isDarkTheme}
          onChange={handlePageChange}
        />
      </div>
    </main>
  );
}

export default Main;
