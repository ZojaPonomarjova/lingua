import "./wordCard.scss";
import React from "react";

import { Button } from "../button";

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

const WordCard = props => {
  return (
    <React.Fragment>
      <div className="word-card" key={props.id}>
        <div className="cl-btn-2" onClick={props.onclickCardClose}>
          <div>
            <div className="leftright"></div>
            <div className="rightleft"></div>
            <span className="close-btn">закрыть</span>
          </div>
        </div>
        <p className="word-card__english">{props.english}</p>
        <p className="word-card__transcription">{props.transcription}</p>
        <div className="word-card__selection">
          {props.clicked ? (
            <React.Fragment>
              <HiddenText translation={props.russian} />
              <Button
                src={"../assets/images/hidden.png"}
                alt={"eye"}
                class={"return-button"}
                text={"Скрыть перевод"}
                onClick={props.onClick1}
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
    </React.Fragment>
  );
};

export default WordCard;
