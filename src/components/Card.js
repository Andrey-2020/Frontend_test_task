import React from "react";
import { options } from "../utils/constant";
import classNames from "classnames/bind";
import * as styles from "../blocks/place/place.scss";
function Card({ card, isDarkTheme, _filter, authors, locations }) {
  const cx = classNames.bind(styles);
  const cardThemeClassName = cx("place", {
    "place--dark": isDarkTheme,
  });

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
        className={cx("place__image")}
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
        <div className={cx("place__info", "place__info_hover")}>
          <h2 className={cx("place__title")}>{card.name}</h2>
          <ul className={cx("place__info-container")}>
            <li className={cx("place__li")}>
              <span className={cx("place__span-accent")}>Author: </span>
              {_filter(authors, card.authorId, "id", "name")}
            </li>
            <li className={cx("place__li")}>
              <span className={cx("place__span-accent")}>Created: </span>
              {card.created}
            </li>
            <li className={cx("place__li")}>
              <span className={cx("place__span-accent")}>Location: </span>
              {_filter(locations, card.locationId, "id", "name")}
            </li>
          </ul>
        </div>
      ) : (
        <div className={cx("place__info")}>
          <h2 className={cx("place__title")}>{card.name}</h2>
        </div>
      )}
    </li>
  );
}

export default Card;
