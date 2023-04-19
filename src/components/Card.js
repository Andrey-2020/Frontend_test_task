import React from "react";
import { options } from "../utils/constant";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card({ card, isDarkTheme, _filter, authors, locations }) {
  const currentUser = React.useContext(CurrentUserContext);
  const cardThemeClassName = `place ${isDarkTheme ? "place_dark" : ""}`;
  
  const [isHovering, setIsHovering] = React.useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <li
      className={cardThemeClassName}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
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
      {isHovering ? (
        <div className="place__info place__info_hover">
          <h2 className="place__title">{card.name}</h2>
          <ul className="place__info-container">
            <li className="place__li">
              <span className="place__span-accent">Author: </span>
              {_filter(authors, card.authorId, "id", "name")}
            </li>
            <li className="place__li">
              <span className="place__span-accent">Created: </span>
              {card.created}
            </li>
            <li className="place__li">
              <span className="place__span-accent">Location: </span>
              {_filter(locations, card.locationId, "id", "name")}
            </li>
          </ul>
        </div>
      ) : (
        <div className="place__info">
          <h2 className="place__title">{card.name}</h2>
        </div>
      )}
    </li>
  );
}

export default Card;
