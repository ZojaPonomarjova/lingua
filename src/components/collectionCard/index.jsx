import "./collectionCard.scss";
import classnames from "classnames";
import { Link } from "react-router-dom";

//компонент для главной страницы Карточка со ссылкой

function CollectionCard({ cardTitle, ...props }) {
  const className = classnames("collection-card", {
    "common-words": props.type === "commonWords",
    "my-words": props.type === "myWords",
    "known-words": props.type === "knownWords",
  });
  return (
    <div className={className}>
      <div className="collection-card__info">
        <h4 className="collection-card__title">{cardTitle}</h4>
        <div className="collection-card__amount">{props.amount}</div>
      </div>
      <Link className="collection-card__link" to={props.collectionCardPath}>
        {props.linkText}
      </Link>
    </div>
  );
}

export default CollectionCard;
