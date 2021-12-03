import "./wordCard.scss";
import React from "react";

import { Button } from "../button";

//кнопка показать перевод
const ShowTranslationButton = props => {
  return (
    <div className="word-card__show-button" onClick={props.onClick}>
      Показать перевод
    </div>
  );
};

//перевод, "спрятанный под кнопкой"
const HiddenText = ({ translation }) => {
  return <p className="word-card__translation">{translation}</p>;
};

//карточка компонент
const WordCard = props => {
  return (
    <div className="word-card" key={props.id} id={props.id}>
      <div className="cl-btn-2" onClick={props.handleClickToLearn}>
        <div>
          <div className="leftright"></div>
          <div className="rightleft"></div>
          <span className="close-btn">закрыть</span>
        </div>
      </div>
      <p className="word-card__english">{props.english}</p>
      <p className="word-card__transcription">{props.transcription}</p>
      <div className="word-card__selection">
        {props.clicked ? ( //если нажата кнопка, то будет показан текст с кнопкой спрятать текст
          <React.Fragment>
            <HiddenText translation={props.russian} />
            <Button
              src="../assets/images/hidden.png"
              alt="eye"
              type="cancelButton"
              // class="return-button"
              text="Скрыть перевод"
              onClick={props.onClickHideTranslation}
            />
          </React.Fragment>
        ) : (
          <ShowTranslationButton
            onClick={props.onClick}
            // clicked={props.clicked}
          />
        )}
      </div>
    </div>
  );
};

export default WordCard;
