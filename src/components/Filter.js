import React from "react";
import { Input, Range, Select } from "fwt-internship-uikit";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Filter(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [valueAuthor, setValuetAuthor] = React.useState("Author");
  const [valueLocation, setValuetLocation] = React.useState("Location");
  const [isAuthorDelete, setIsAuthorDelete] = React.useState(false);
  const [isLocationDelete, setIsLocationDelete] = React.useState(false);
  const [valueInput, setValuetInput] = React.useState("");
  const [valueCreatedFrom, setValuetCreatedFrom] = React.useState("");
  const [valueCreatedBefore, setValuetCreatedBefore] = React.useState("");
  const selectThemeClassName = `search__select ${
    props.isDarkTheme ? "search__select_dark" : ""
  }`;
  function filterDeleteButtonClassName(boolean) {
    return `search__delete ${boolean ? "" : "search__delete-none"} ${
      props.isDarkTheme ? "search__delete_dark" : ""
    }`;
  }
  const selectThemeLineClassName = `search__range-line ${
    props.isDarkTheme ? "search__range-line_dark" : ""
  }`;
  
  function _handleSelectChange(list, value, anyObjectField) {
    props.handleFieldFilter(
      anyObjectField,
      props._filter(list, value, "name", "id")
    );
  }

  function handleSelectAuthorChange(value) {
    setValuetAuthor(value);
    setIsAuthorDelete(true);
    _handleSelectChange(props.authors, value, "authorId");
  }

  function handleSelectLocationChange(value) {
    setValuetLocation(value);
    setIsLocationDelete(true);
    _handleSelectChange(props.locations, value, "locationId");
  }

  function handleInputChange(e) {
    setValuetInput(e.target.value);
    props.handleFieldFilter("q", e.target.value);
  }
  function handleInputCreatedChange(e) {
    if (e.target.placeholder === "from") {
      setValuetCreatedFrom(e.target.value);
      props.handleFieldFilter("created_gte", e.target.value);
    }
    if (e.target.placeholder === "before") {
      setValuetCreatedBefore(e.target.value);
      props.handleFieldFilter("created_lte", e.target.value);
    }
    console.log(e.target.value);
  }
  function handleFilterAuthorDelete() {
    setValuetAuthor("Author");
    setIsAuthorDelete(false);
    props.handleFieldFilter("authorId", "");
  }
  function handleFilterLocationDelete() {
    setValuetLocation("Location");
    setIsLocationDelete(false);
    props.handleFieldFilter("locationId", "");
  }
  function handleCreatedChange() {}
  return (
    <section className="search">
      <Input
        className={selectThemeClassName}
        isDarkTheme={props.isDarkTheme}
        placeholder="Name"
        onChange={handleInputChange}
      />
      <div className="search__selectList">
        <Select
          className={selectThemeClassName}
          isDarkTheme={props.isDarkTheme}
          value={valueAuthor}
          options={props.authors}
          onChange={handleSelectAuthorChange}
        />
        <button
          className={filterDeleteButtonClassName(isAuthorDelete)}
          type="button"
          aria-label="delete"
          onClick={handleFilterAuthorDelete}
        />
      </div>
      <div className="search__selectList">
        <Select
          className={selectThemeClassName}
          isDarkTheme={props.isDarkTheme}
          value={valueLocation}
          options={props.locations}
          onChange={handleSelectLocationChange}
        />
        <button
          className={filterDeleteButtonClassName(isLocationDelete)}
          type="button"
          aria-label="delete"
          onClick={handleFilterLocationDelete}
        />
      </div>
      <Range
        className={selectThemeClassName}
        isDarkTheme={props.isDarkTheme}
        children={
          <div className="search__range-container">
            <input
              className="search__range-input"
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
              className="search__range-input"
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
    </section>
  );
}

export default Filter;
