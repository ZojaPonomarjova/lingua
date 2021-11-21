import "./wordCard.scss";
import { useState } from "react";
import { bodyCellData } from "../table/tableData/bodyCellData";

const ShowTranslationButton = props => {
  return (
    <div className="word-card__show-button" onClick={props.onClick}>
      Показать перевод
    </div>
  );
};

const HiddenText = ({ translation }) => {
  return <p className="word-card__translation">{translation}</p>;
};

const WordCard = () => {
  const [clicked, setComponent] = useState(false);

  const handleChange = () => {
    setComponent(!clicked);
  };

  return (
    <div className="container">
      {bodyCellData.map(card => (
        <div className="word-card" key={card.id}>
          <div className="cl-btn-2">
            <div>
              <div className="leftright"></div>
              <div className="rightleft"></div>
              <span className="close-btn">закрыть</span>
            </div>
          </div>
          <p className="word-card__english">{card.english}</p>
          <p className="word-card__transcription">{card.transcription}</p>
          <div className="word-card__selection">
            {clicked ? (
              <HiddenText translation={card.russian} />
            ) : (
              <ShowTranslationButton onClick={handleChange} clicked={false} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordCard;
