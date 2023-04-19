import React from "react";
import { Input, Range, Pagination, Select } from "fwt-internship-uikit";
// import { Range } from "./Range";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Filter(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [valueAuthor, setValuetAuthor] = React.useState([]);
  const [select, setSelect] = React.useState([]);
  function handleSelectChange(value) {
    setSelect(value);
    setValuetAuthor(value)
    console.log(value);
  }
  function handleCreatedChange(e) {
    props.setCreated(e);
    console.log(e);
  }
  return (
    <section className="search">
      <Input
        className={"search__select"}
        isDarkTheme={true}
        placeholder="Name"
      />
      <Select
        className={"search__select"}
        isDarkTheme={true}
        value={valueAuthor}
        options={props.authors}
        onChange={handleSelectChange}
      />
      <Select
        className={"search__select"}
        isDarkTheme={true}
        value={"Location"}
        options={props.locations}
        onChange={handleSelectChange}
      />
      <Range
        className={"search__select"}
        isDarkTheme={true}
        children={<div>123</div>}
        onClose={handleCreatedChange}
      />
    </section>
  );
}

export default Filter;
