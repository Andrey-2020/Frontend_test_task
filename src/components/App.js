import React from "react";
import Header from "./Header";
import Main from "./Main";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import classNames from "classnames/bind";
import styles from "../blocks/root/root.scss";

function App() {
  const currentUser = React.useContext(CurrentUserContext);
  const cx = classNames.bind(styles);
  const [cards, setCards] = React.useState([]);
  const [authors, setAuthors] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  const [pagesAmount, setPagesAmount] = React.useState("");
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [parameters, setParameters] = React.useState({ _page: 1, _limit: 12 });
  const rootThemeClassName = cx("root", {
    "root--dark": isDarkTheme,
  });

  function handleCardsFilter(result) {
    let data = {};
    Object.keys(result).forEach((key) => {
      if (result[key]) data[key] = result[key];
    });
    setParameters(data);
  }

  React.useEffect(() => {
    Promise.all([
      api.getCardTasks(parameters),
      api.getCardTasks(
        [parameters].map(({ _page, _limit, ...otherParam }) => otherParam)[0]
      ),
    ])
      .then(([cards, pages]) => {
        setCards(cards);
        setPagesAmount(Math.ceil(pages.length / parameters["_limit"]));
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }, [parameters]);

  React.useEffect(() => {
    Promise.all([api.getAuthorTasks(), api.getLocationsTasks()])
      .then(([authors, locations]) => {
        setAuthors(authors);
        setLocations(
          locations.map(({ id, location }) => ({ id, name: location }))
        );
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }, []);

  return (
    <div className={rootThemeClassName}>
      <CurrentUserContext.Provider value={currentUser}>
        <Header isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
        <Main
          isDarkTheme={isDarkTheme}
          cards={cards}
          authors={authors}
          locations={locations}
          parameters={parameters}
          handleCardsFilter={handleCardsFilter}
          pagesAmount={pagesAmount}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
