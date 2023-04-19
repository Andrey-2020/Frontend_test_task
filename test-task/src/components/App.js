import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Filter from "./Filter";
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
  const [parameters, setParameters] = React.useState({ _page: 1, _limit: 12 });


  React.useEffect(() => {
    Promise.all([
      api.getCardTasks(parameters),
      api.getAuthorTasks(),
      api.getLocationsTasks(),
    ])
      .then(([cards, authors, locations]) => {
        console.log(cards)
        setCards(cards);
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
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          authors={authors}
          locations={locations}
          setCreated={setCreated}
          // onEditProfile={handleEditProfileClick}
          // onAddPlace={handleAddPlaceClick}
          // onEditAvatar={handleEditAvatarClick}
          // onCardClick={handleCardClick}
          // onCardLike={handleCardLike}
          // onDeleteClick={handleConfirmDeleteClick}
        />
        <Footer />
        {/* <EditProfilePopup
          // isOpen={isEditProfilePopupOpen}
          // onClose={closeAllPopups}
          // onUpdateUser={handleUpdateUser}
        /> */}
        {/* <AddPlacePopup
          // isOpen={isAddPlacePopupOpen}
          // onClose={closeAllPopups}
          // buttonText={"Создать"}
          // onAddCard={handleAddCard}
        /> */}
        {/* <PopupWithConfirm
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isEditImagePopupOpen}
          onClose={closeAllPopups}
        /> */}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
