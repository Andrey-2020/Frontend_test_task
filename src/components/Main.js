import React from "react";
import Card from "./Card";
import Filter from "./Filter";
import Paginator from "./Paginator";
import classNames from "classnames/bind";
import * as styles from "../blocks/places/places.scss";
function Main({
  isDarkTheme,
  cards,
  authors,
  locations,
  parameters,
  handleCardsFilter,
  pagesAmount,
}) {
  const cx = classNames.bind(styles);

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

  function _filter(list, value, anyObjectField, returnField) {
    let filter = list.filter((item) => {
      if (item[anyObjectField] === value) {
        return item.id;
      }
      return false;
    });
    return filter[0][returnField];
  }

  return (
    <main>
      <Filter
        authors={authors}
        locations={locations}
        handleFieldFilter={_handleFieldFilter}
        isDarkTheme={isDarkTheme}
        _filter={_filter}
      />
      <section>
        <ul className={cx("places")}>
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
      <Paginator
        pagesAmount={pagesAmount}
        parameters={parameters}
        isDarkTheme={isDarkTheme}
        handlePageChange={handlePageChange}
      />
    </main>
  );
}

export default Main;
