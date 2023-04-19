import logo from '../images/logo.svg';
import themeButton from '../images/buttonWhite.svg';

function Header() {
    return (
        <header className="header">
            <img className="logo" src={logo} alt="Логотип" />
            <img className="header__theme" src={themeButton} alt="Логотип" />
        </header>
    );
}

export default Header;
