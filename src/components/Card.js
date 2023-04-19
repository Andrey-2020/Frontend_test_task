import React from "react";
import { options } from "../utils/constant";
import api from "../utils/api";
// import remove from '../images/Delete.svg';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card({ card, onCardClick, onCardLike, onDeleteClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <li className="place">
      
      <img
        className="place__image"
        src={`${options.url}${card.imageUrl}`}
        onError={(event) => {
          console.log(
            `Изображение по адресу ${event.currentTarget.src} не было загружено из-за проблем на сервере`
          );
          event.currentTarget.src = `${options.url}${card.imageUrl}`;
          console.log(`Повторная загрузка изображения.......`);
        }}
        alt={`Картина ${card.name}`}
      />
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
