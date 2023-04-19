import React from "react";
import { options } from "../utils/constant";
import api from "../utils/api";
// import remove from '../images/Delete.svg';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card({ card, onCardClick, onCardLike, onDeleteClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <li className="place">
      <div
        className="place__image"
        style={{ backgroundImage: `url(${options.url}${card.imageUrl})` }}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.backgroundImage = "https://i.ytimg.com/vi/0JHV9HkJwqo/maxresdefault.jpg";
        }}
      ></div>
      {/* <img className={cardDeleteButtonClassName} alt="Удалить" onClick={handleDeleteClick} /> */}
      <div className="place__info">
        <h2 className="place__title">{card.name}</h2>
        {/* <div className="place__like-container">
                    <button className={cardLikeButtonClassName} type="button" aria-label="like" onClick={handleLikeClick} ></button>
                    <div className="place__number-of-like">{card.likes.length}</div>
                </div> */}
      </div>
    </li>
  );
}

export default Card;
