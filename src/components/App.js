import React from "react";
import Header from "./Header";
import Main from "./Main";
import { CurrentThemeContext } from "../contexts/CurrentThemeContext";
import api from "../utils/api";
import classNames from "classnames/bind";
import styles from "../blocks/root/root.scss";

function App() {
  const cx = classNames.bind(styles);
  const [cards, setCards] = React.useState([]);
  const [authors, setAuthors] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  const [pagesAmount, setPagesAmount] = React.useState("");
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
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
    Promise.all([api.getAuthorTasks(), api.getLocationsTasks()])
      .then(([authorsList, locations]) => {
          setAuthors(authorsList);
          setLocations(
            locations.map(({ id, location }) => ({ id, name: location }))
          );
          setIsMounted(true);
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }, []);

  React.useEffect(() => {
    Promise.all([
      api.getCardTasks(parameters),
      api.getCardTasks(
        [parameters].map(({ _page, _limit, ...otherParam }) => otherParam)[0]
      ),
    ])
      .then(([cardsList, pages]) => {
        setCards(cardsList);
        setPagesAmount(Math.ceil(pages.length / parameters["_limit"]));
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }, [parameters]);

  return (
    <div className={rootThemeClassName}>
      <CurrentThemeContext.Provider value={isDarkTheme}>
        <Header setIsDarkTheme={setIsDarkTheme} />
        <Main
          isMounted={isMounted}
          cards={cards}
          authors={authors}
          locations={locations}
          parameters={parameters}
          handleCardsFilter={handleCardsFilter}
          pagesAmount={pagesAmount}
        />
      </CurrentThemeContext.Provider>
    </div>
  );
}

export default App;
