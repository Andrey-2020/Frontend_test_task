import React from "react";
import * as uikit from "fwt-internship-uikit";
import { CurrentThemeContext } from "../contexts/CurrentThemeContext";
import classNames from "classnames/bind";
import * as styles from "../blocks/filter/filter.scss";
function Input({ handleFieldFilter }) {
  const cx = classNames.bind(styles);
  const currentIsDarkTheme = React.useContext(CurrentThemeContext);
  const [valueInput, setValuetInput] = React.useState("");
  const selectThemeClassName = cx("filter__select", {
    "filter__select--dark": currentIsDarkTheme,
  });

  function handleInputChange(e) {
    setValuetInput(e.target.value);
    handleFieldFilter("q", e.target.value);
  }

  return (
    <section className={"input"}>
      <uikit.Input
        className={selectThemeClassName}
        isDarkTheme={currentIsDarkTheme}
        placeholder="Name"
        value={valueInput}
        onChange={handleInputChange}
      />
    </section>
  );
}

export default Input;
