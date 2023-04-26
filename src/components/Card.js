import React from "react";
import { options } from "../utils/constant";
import { CurrentThemeContext } from "../contexts/CurrentThemeContext";
import classNames from "classnames/bind";
import * as styles from "../blocks/place/place.scss";
function Card({ card, authors, locations }) {
  const currentIsDarkTheme = React.useContext(CurrentThemeContext);
  const cx = classNames.bind(styles);
  const cardThemeClassName = cx("place", {
    "place--dark": currentIsDarkTheme,
  });
  const [author, setAuthor] = React.useState("");
  const [location, setLocations] = React.useState("");

  React.useEffect(() => {
    setAuthor(authors.filter((item) => item["id"] === card.authorId)[0].name);
    setLocations(
      locations.filter((item) => item["id"] === card.locationId)[0].name
    );
  }, [authors, locations, card]);

  return (
    <li className={cardThemeClassName}>
      <img
        className={"place__image"}
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
      <div className={"place__info place__info-title"}>
        <h2 className={"place__title"}>{card.name}</h2>
      </div>
      <div className={"place__info place__info_hover"}>
        <h2 className={"place__title"}>{card.name}</h2>
        <ul className={"place__info-container"}>
          <li className={"place__li"}>
            <span className={"place__span-accent"}>Author: </span>
            {author}
          </li>
          <li className={"place__li"}>
            <span className={"place__span-accent"}>Created: </span>
            {card.created}
          </li>
          <li className={"place__li"}>
            <span className={"place__span-accent"}>Location: </span>
            {location}
          </li>
        </ul>
      </div>
    </li>
  );
}

export default Card;
