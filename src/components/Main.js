import React from "react";
import Card from "./Card";
import Filter from "./Filter";
import Paginator from "./Paginator";
import "../blocks/places/places.scss";
function Main({
  cards,
  authors,
  locations,
  parameters,
  handleCardsFilter,
  pagesAmount,
}) {
  function _handleFieldFilter(
    fieldName,
    value,
    isMany = false,
    isPaginator = false
  ) {
    let newParameters = Object.assign(parameters);
    if (!isPaginator) {
      newParameters["_page"] = 1;
    }
    if (isMany) {
      for (let i = 0; i < fieldName.length; i++) {
        newParameters[fieldName[i]] = value[i];
      }
    } else {
      newParameters[fieldName] = value;
    }
    handleCardsFilter(newParameters);
  }

  function handlePageChange(currentPage) {
    _handleFieldFilter("_page", currentPage, false, true);
  }

  return (
    <main>
      <Filter
        authors={authors}
        locations={locations}
        handleFieldFilter={_handleFieldFilter}
      />
      <section>
        <ul className={"places"}>
          {cards.map((card) => (
            <Card
              card={card}
              key={card.id}
              authors={authors}
              locations={locations}
            />
          ))}
        </ul>
      </section>
      <Paginator
        pagesAmount={pagesAmount}
        parameters={parameters}
        handlePageChange={handlePageChange}
      />
    </main>
  );
}

export default Main;
