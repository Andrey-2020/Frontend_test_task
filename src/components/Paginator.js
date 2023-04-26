import React from "react";
import classNames from "classnames/bind";
import * as styles from "../blocks/pagination/pagination.scss";
import { Pagination } from "fwt-internship-uikit";
import { CurrentThemeContext } from "../contexts/CurrentThemeContext";
function Paginator({ pagesAmount, parameters, handlePageChange }) {
  const cx = classNames.bind(styles);
  const currentIsDarkTheme = React.useContext(CurrentThemeContext);
  const paginationThemeClassName = cx("pagination", {
    "pagination--dark": currentIsDarkTheme,
  });

  return (
    <section className={paginationThemeClassName} role="navigation">
      <Pagination
        className={"pagination__content"}
        pagesAmount={pagesAmount}
        currentPage={parameters["_page"]}
        isDarkTheme={currentIsDarkTheme}
        onChange={handlePageChange}
      />
    </section>
  );
}

export default Paginator;
