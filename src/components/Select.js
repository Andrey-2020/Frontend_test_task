import React from "react";
import * as uikit from "fwt-internship-uikit";
import { CurrentThemeContext } from "../contexts/CurrentThemeContext";
import classNames from "classnames/bind";
import * as styles from "../blocks/filter/filter.scss";
function Select({ field, handleFieldFilter, defaultValue, id }) {
  const cx = classNames.bind(styles);
  const currentIsDarkTheme = React.useContext(CurrentThemeContext);
  const [valueAuthor, setValuetAuthor] = React.useState(defaultValue);
  const [isAuthorDelete, setIsAuthorDelete] = React.useState(false);
  const selectThemeClassName = cx("filter__select", {
    "filter__select--dark": currentIsDarkTheme,
  });
  function filterDeleteButtonClassName(boolean) {
    return cx("filter__delete", {
      "filter__delete--none": !boolean,
      "filter__delete--dark": currentIsDarkTheme,
    });
  }
  function _handleSelectChange(list, value, anyObjectField) {
    let filter = list.filter((item) => item["name"] === value);
    let set = filter[0]["id"];
    handleFieldFilter(anyObjectField, set);
  }

  function handleSelectAuthorChange(value) {
    setValuetAuthor(value);
    setIsAuthorDelete(true);
    _handleSelectChange(field, value, id);
  }

  function handleFilterAuthorDelete() {
    setValuetAuthor(defaultValue);
    setIsAuthorDelete(false);
    handleFieldFilter(id, "");
  }
  return (
    <section className={"selects"}>
      <uikit.Select
        className={selectThemeClassName}
        isDarkTheme={currentIsDarkTheme}
        value={valueAuthor}
        options={field}
        onChange={handleSelectAuthorChange}
      />
      <button
        className={filterDeleteButtonClassName(isAuthorDelete)}
        type="button"
        aria-label="delete"
        onClick={handleFilterAuthorDelete}
      />
    </section>
  );
}

export default Select;
