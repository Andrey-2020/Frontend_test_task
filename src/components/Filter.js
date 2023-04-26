import React from "react";
import "../blocks/filter/filter.scss";
import Input from "./Input";
import Select from "./Select";
import Range from "./Range";
function Filter({ authors, locations, handleFieldFilter }) {
  return (
    <section className={"filter"}>
      <div className={"filter__selectList"}>
        <Input handleFieldFilter={handleFieldFilter} />
      </div>
      <div className={"filter__selectList"}>
        <Select
          field={authors}
          handleFieldFilter={handleFieldFilter}
          defaultValue={"Author"}
          id={"authorId"}
        />
      </div>
      <div className={"filter__selectList"}>
        <Select
          field={locations}
          handleFieldFilter={handleFieldFilter}
          defaultValue={"Location"}
          id={"locationId"}
        />
      </div>
      <div className={"filter__selectList"}>
        <Range handleFieldFilter={handleFieldFilter} />
      </div>
    </section>
  );
}

export default Filter;
