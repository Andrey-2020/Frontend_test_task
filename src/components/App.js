import React from "react";
import Header from "./Header";
import Main from "./Main";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  // const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  // const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  // const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  // const [isEditImagePopupOpen, setIsEditImagePopupOpen] = React.useState(false);
  // const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });
  const [cards, setCards] = React.useState([]);
  const [authors, setAuthors] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  const [created, setCreated] = React.useState([]);
  const [pagesAmount, setPagesAmount] = React.useState([]);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [parameters, setParameters] = React.useState({ _page: 1, _limit: 12 });
  const rootThemeClassName = (
    `root ${isDarkTheme ? 'root_dark' : ''}`
);

  function handleCardsFilter(result) {
    let data = {};
    Object.keys(result).forEach((key) => {
      if (result[key]) data[key] = result[key];
    });
    setParameters(data);
    console.log(data);
    Promise.all([
      api.getCardTasks(data),
      api.getCardTasks(
        [data].map(({ _page, _limit, ...otherParam }) => otherParam)[0]
      ),
    ])
      .then(([newCard, pages]) => {
        setCards(newCard);
        setPagesAmount(Math.ceil(pages.length / parameters["_limit"]));
      })
      .catch((err) => console.log("Ошибка. Запрос не выполнен: ", err));
  }

  React.useEffect(() => {
    Promise.all([
      api.getCardTasks(parameters),
      api.getCardTasks(
        [parameters].map(({ _page, _limit, ...otherParam }) => otherParam)[0]
      ),
      api.getAuthorTasks(),
      api.getLocationsTasks(),
    ])
      .then(([cards, pages, authors, locations]) => {
        console.log(cards);
        setCards(cards);
        setPagesAmount(Math.ceil(pages.length / parameters["_limit"]));
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
          setCreated={setCreated}
          parameters={parameters}
          setParameters={setParameters}
          handleCardsFilter={handleCardsFilter}
          pagesAmount={pagesAmount}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
