import classNames from "classnames/bind";
import * as styles from "../blocks/pagination/pagination.scss";
import { Pagination } from "fwt-internship-uikit";
function Paginator({
  pagesAmount,
  parameters,
  isDarkTheme,
  handlePageChange,
}) {
  const cx = classNames.bind(styles);
  const paginationThemeClassName = cx("pagination", {
    "pagination--dark": isDarkTheme,
  });

  return (
    <section className={paginationThemeClassName} role="navigation">
      <Pagination
        className={cx("pagination__content")}
        pagesAmount={pagesAmount}
        currentPage={parameters["_page"]}
        isDarkTheme={isDarkTheme}
        onChange={handlePageChange}
      />
    </section>
  );
}

export default Paginator;
