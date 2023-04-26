import React from "react";
import logo from "../images/logo.svg";
import themeWhiteButton from "../images/buttonWhite.svg";
import themeBlackButton from "../images/buttonBlack.svg";
import "../blocks/header/header.scss";
import { CurrentThemeContext } from "../contexts/CurrentThemeContext";
function Header({ setIsDarkTheme }) {
  const currentIsDarkTheme = React.useContext(CurrentThemeContext);
  function handleThemeChange() {
    const body = document.querySelector("body");
    !currentIsDarkTheme
      ? body.setAttribute("style", "background-color: #000000;")
      : body.setAttribute("style", "background-color: #ffffff;");
    setIsDarkTheme(!currentIsDarkTheme);
  }

  return (
    <header className={"header"}>
      <img className={"header__logo"} src={logo} alt="Логотип" />
      <img
        className={"header__theme"}
        src={currentIsDarkTheme ? themeWhiteButton : themeBlackButton}
        alt="Смена темы"
        onClick={handleThemeChange}
      />
    </header>
  );
}

export default Header;
