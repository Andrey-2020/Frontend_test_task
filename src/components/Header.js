import logo from "../images/logo.svg";
import themeWhiteButton from "../images/buttonWhite.svg";
import themeBlackButton from "../images/buttonBlack.svg";
import classNames from 'classnames/bind';
import * as styles from "../blocks/header/header.scss";
function Header({ isDarkTheme, setIsDarkTheme }) {
  const cx = classNames.bind(styles);
  function handleThemeChange() {
    const body = document.querySelector("body");
    !isDarkTheme
      ? body.setAttribute("style", "background-color: #000000;")
      : body.setAttribute("style", "background-color: #ffffff;");
    setIsDarkTheme(!isDarkTheme);
  }

  return (
    <header className={cx("header")}>
      <img className={cx("header__logo")} src={logo} alt="Логотип" />
      <img
        className={cx("header__theme")}
        src={isDarkTheme ? themeWhiteButton : themeBlackButton}
        alt="Смена темы"
        onClick={handleThemeChange}
      />
    </header>
  );
}

export default Header;
