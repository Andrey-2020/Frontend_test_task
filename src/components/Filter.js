import React from "react";
import { Input, Range, Select } from "fwt-internship-uikit";
import { CurrentThemeContext } from "../contexts/CurrentThemeContext";
import classNames from "classnames/bind";
import * as styles from "../blocks/filter/filter.scss";
function Filter({ authors, locations, handleFieldFilter }) {
  const cx = classNames.bind(styles);
  const currentIsDarkTheme = React.useContext(CurrentThemeContext);
  const [valueAuthor, setValuetAuthor] = React.useState("Author");
  const [valueLocation, setValuetLocation] = React.useState("Location");
  const [isAuthorDelete, setIsAuthorDelete] = React.useState(false);
  const [isLocationDelete, setIsLocationDelete] = React.useState(false);
  const [isCreatedDelete, setIsCreatedDelete] = React.useState(false);
  const [valueInput, setValuetInput] = React.useState("");
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

  function _handleSelectChange(list, value, anyObjectField) {
    let filter = list.filter((item) => item["name"] === value);
    let set = filter[0]["id"];
    handleFieldFilter(anyObjectField, set);
  }

  function handleSelectAuthorChange(value) {
    setValuetAuthor(value);
    setIsAuthorDelete(true);
    _handleSelectChange(authors, value, "authorId");
  }

  function handleSelectLocationChange(value) {
    setValuetLocation(value);
    setIsLocationDelete(true);
    _handleSelectChange(locations, value, "locationId");
  }

  function handleInputChange(e) {
    setValuetInput(e.target.value);
    handleFieldFilter("q", e.target.value);
  }
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
  function handleFilterAuthorDelete() {
    setValuetAuthor("Author");
    setIsAuthorDelete(false);
    handleFieldFilter("authorId", "");
  }
  function handleFilterLocationDelete() {
    setValuetLocation("Location");
    setIsLocationDelete(false);
    handleFieldFilter("locationId", "");
  }
  function handleFilterCreatednDelete() {
    setValuetCreatedFrom("");
    setValuetCreatedBefore("");
    setIsCreatedDelete(false);
    handleFieldFilter(["created_gte", "created_lte"], ["", ""], true);
  }
  function handleCreatedChange() {}
  return (
    <section className={"filter"}>
      <div className={"filter__selectList"}>
        <Input
          className={selectThemeClassName}
          isDarkTheme={currentIsDarkTheme}
          placeholder="Name"
          value={valueInput}
          onChange={handleInputChange}
        />
      </div>
      <div className={"filter__selectList"}>
        <Select
          className={selectThemeClassName}
          isDarkTheme={currentIsDarkTheme}
          value={valueAuthor}
          options={authors}
          onChange={handleSelectAuthorChange}
        />
        <button
          className={filterDeleteButtonClassName(isAuthorDelete)}
          type="button"
          aria-label="delete"
          onClick={handleFilterAuthorDelete}
        />
      </div>
      <div className={"filter__selectList"}>
        <Select
          className={selectThemeClassName}
          isDarkTheme={currentIsDarkTheme}
          value={valueLocation}
          options={locations}
          onChange={handleSelectLocationChange}
        />
        <button
          className={filterDeleteButtonClassName(isLocationDelete)}
          type="button"
          aria-label="delete"
          onClick={handleFilterLocationDelete}
        />
      </div>
      <div className={"filter__selectList"}>
        <Range
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
      </div>
    </section>
  );
}

export default Filter;
