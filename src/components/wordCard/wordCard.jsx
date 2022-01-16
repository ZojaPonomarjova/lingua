import "./wordCard.scss";
import React, { useEffect, useRef } from "react";
import ShowTranslationButton, { Button } from "../button";

//перевод, "спрятанный под кнопкой"
const HiddenText = ({ translation }) => {
  return <p className="word-card__translation">{translation}</p>;
};

//карточка компонент
const WordCard = props => {
  const ref = useRef();
  useEffect(() => ref.current.focus(), []);

  return (
    <div className="word-card" key={props.id} id={props.id}>
      <div className="cl-btn-2" onClick={() => props.handleClickToLearn(null)}>
        <div>
          <div className="left-right"></div>
          <div className="right-left"></div>
          <span className="close-btn">закрыть</span>
        </div>
      </div>
      <p className="word-card__english">{props.english}</p>
      <p className="word-card__transcription">{props.transcription}</p>
      <div className="word-card__selection">
        {props.clicked ? ( //если нажата кнопка, то будет показан текст с кнопкой спрятать текст
          <React.Fragment>
            <HiddenText translation={props.russian} />
            <div className="word-card__buttons-container">
              <Button
                src="../assets/images/hidden.png"
                alt="eye"
                type="cancelButton"
                text="Скрыть перевод"
                onClick={props.onClickHideTranslation}
              />
              <Button
                src="../assets/images/confetti.png"
                alt="confetti"
                type="cancelButton"
                text="Знаю слово"
                onClick={props.onClickKnownWordCount}
                disabled={props.isLearned}
              />
            </div>
          </React.Fragment>
        ) : (
          <ShowTranslationButton
            showTranslationButtonOnClick={props.showTranslationButtonOnClick}
            ref={ref}
          />
        )}
      </div>
    </div>
  );
};

export default WordCard;
