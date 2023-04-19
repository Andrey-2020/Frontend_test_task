import React from "react";
import { options } from "../utils/constant";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card({ card, isDarkTheme, onCardLike, onDeleteClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const cardThemeClassName = `place ${isDarkTheme ? "place_dark" : ""}`;
  return (
    <li className={cardThemeClassName}>
      <img
        className="place__image"
        // style={{backgroundImage: 'url('+ `${options.url}${card.imageUrl}`+')'}}
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
      <div className="place__info">
        <h2 className="place__title">{card.name}</h2>
      </div>
    </li>
  );
}

export default Card;
