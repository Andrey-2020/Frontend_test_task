import React from "react";
import { Input, Range, Select } from "fwt-internship-uikit";
import classNames from "classnames/bind";
import * as styles from "../blocks/filter/filter.scss";
function Filter({
  authors,
  locations,
  handleFieldFilter,
  isDarkTheme,
  _filter,
}) {
  const cx = classNames.bind(styles);
  const [valueAuthor, setValuetAuthor] = React.useState("Author");
  const [valueLocation, setValuetLocation] = React.useState("Location");
  const [isAuthorDelete, setIsAuthorDelete] = React.useState(false);
  const [isLocationDelete, setIsLocationDelete] = React.useState(false);
  const [isCreatedDelete, setIsCreatedDelete] = React.useState(false);
  const [valueInput, setValuetInput] = React.useState("");
  const [valueCreatedFrom, setValuetCreatedFrom] = React.useState("");
  const [valueCreatedBefore, setValuetCreatedBefore] = React.useState("");
  const selectThemeClassName = cx("filter__select", {
    "filter__select--dark": isDarkTheme,
  });
  function filterDeleteButtonClassName(boolean) {
    return cx("filter__delete", {
      "filter__delete--none": !boolean,
      "filter__delete--dark": isDarkTheme,
    });
  }
  const selectThemeLineClassName = cx("filter__range-line", {
    "filter__range-line--dark": isDarkTheme,
  });

  function _handleSelectChange(list, value, anyObjectField) {
    handleFieldFilter(anyObjectField, _filter(list, value, "name", "id"));
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
    <section className={cx("filter")}>
      <div className={cx("filter__selectList")}>
        <Input
          className={selectThemeClassName}
          isDarkTheme={isDarkTheme}
          placeholder="Name"
          value={valueInput}
          onChange={handleInputChange}
        />
      </div>
      <div className={cx("filter__selectList")}>
        <Select
          className={selectThemeClassName}
          isDarkTheme={isDarkTheme}
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
      <div className={cx("filter__selectList")}>
        <Select
          className={selectThemeClassName}
          isDarkTheme={isDarkTheme}
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
      <div className={cx("filter__selectList")}>
        <Range
          className={selectThemeClassName}
          isDarkTheme={isDarkTheme}
          children={
            <div className={cx("filter__range-container")}>
              <input
                className={cx("filter__range-input")}
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
                className={cx("filter__range-input")}
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
