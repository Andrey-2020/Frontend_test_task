import React from "react";
import * as uikit from "fwt-internship-uikit";
import { CurrentThemeContext } from "../contexts/CurrentThemeContext";
import classNames from "classnames/bind";
import * as styles from "../blocks/filter/filter.scss";
function Range({ handleFieldFilter }) {
  const cx = classNames.bind(styles);
  const currentIsDarkTheme = React.useContext(CurrentThemeContext);
  const [isCreatedDelete, setIsCreatedDelete] = React.useState(false);
  const [valueCreatedFrom, setValuetCreatedFrom] = React.useState("");
  const [valueCreatedBefore, setValuetCreatedBefore] = React.useState("");
  const selectThemeClassName = cx("filter__select", {
    "filter__select--dark": currentIsDarkTheme,
  });
  function filterDeleteButtonClassName(boolean) {
    return cx("filter__delete", {
      "filter__delete--none": !boolean,
      "filter__delete--dark": currentIsDarkTheme,
    });
  }
  const selectThemeLineClassName = cx("filter__range-line", {
    "filter__range-line--dark": currentIsDarkTheme,
  });

  function handleInputCreatedChange(e) {
    setIsCreatedDelete(true);
    if (e.target.placeholder === "from") {
      setValuetCreatedFrom(e.target.value);
      handleFieldFilter("created_gte", e.target.value);
      if (!e.target.value && !valueCreatedBefore) {
        setIsCreatedDelete(false);
      }
    }
    if (e.target.placeholder === "before") {
      setValuetCreatedBefore(e.target.value);
      handleFieldFilter("created_lte", e.target.value);
      if (!e.target.value && !valueCreatedFrom) {
        setIsCreatedDelete(false);
      }
    }
  }
  function handleFilterCreatednDelete() {
    setValuetCreatedFrom("");
    setValuetCreatedBefore("");
    setIsCreatedDelete(false);
    handleFieldFilter(["created_gte", "created_lte"], ["", ""], true);
  }
  function handleCreatedChange() {}
  return (
    <section className={"range"}>
      <uikit.Range
        className={selectThemeClassName}
        isDarkTheme={currentIsDarkTheme}
        children={
          <div className={"filter__range-container"}>
            <input
              className={"filter__range-input"}
              type="number"
              placeholder="from"
              onInput={(e) => {
                e.target.value = e.target.value.slice(0, 4);
              }}
              onChange={handleInputCreatedChange}
              value={valueCreatedFrom}
            />
            <div className={selectThemeLineClassName}></div>
            <input
              className={"filter__range-input"}
              type="number"
              placeholder="before"
              onInput={(e) => {
                e.target.value = e.target.value.slice(0, 4);
              }}
              onChange={handleInputCreatedChange}
              value={valueCreatedBefore}
            />
          </div>
        }
        onClose={handleCreatedChange}
      />
      <button
        className={filterDeleteButtonClassName(isCreatedDelete)}
        type="button"
        aria-label="delete"
        onClick={handleFilterCreatednDelete}
      />
    </section>
  );
}

export default Range;
