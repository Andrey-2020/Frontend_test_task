import logo from "../images/logo.svg";
import themeWhiteButton from "../images/buttonWhite.svg";
import themeBlackButton from "../images/buttonBlack.svg";

function Header({ isDarkTheme, setIsDarkTheme }) {
  function handleThemeChange() {
    setIsDarkTheme(!isDarkTheme);
  }

  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип" />
      <img
        className="header__theme"
        src={isDarkTheme? themeWhiteButton  : themeBlackButton}
        alt="Смена темы"
        onClick={handleThemeChange}
      />
    </header>
  );
}

export default Header;
