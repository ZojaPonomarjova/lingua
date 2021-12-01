import "./wordCard.scss";
import WordCard from "./wordCard";
import { bodyCellData } from "../tableData/bodyCellData";
import { useState } from "react";
import classnames from "classnames";

const Arrow = props => {
  return (
    <div className="word-card__img-container">
      <img
        src={props.src}
        alt={props.alt}
        className={`word-card__arrow ${props.className}`}
        onClick={props.onClick}
      />
    </div>
  );
};

const WordCardContainer = props => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(
    props.learnedRowIndex,
  );
  const [clicked, setComponent] = useState(false);
  const [cardsEnded, setCardsEnded] = useState(false);

  const handleChange = () => {
    setComponent(!clicked);
  };

  const handleClickNext = () => {
    const nextIndex = selectedCardIndex + 1;
    if (nextIndex < bodyCellData.length) {
      setSelectedCardIndex(nextIndex);
      if (clicked) {
        setComponent(!clicked);
      }
    } else if (nextIndex >= bodyCellData.length) {
      setCardsEnded(true);
    }
  };
  const handleClickPrev = () => {
    const nextIndex = selectedCardIndex - 1;
    if (nextIndex >= 0) {
      setSelectedCardIndex(nextIndex);
      if (clicked === true) {
        setComponent(!clicked);
      }
      if (cardsEnded === true) {
        setCardsEnded(!cardsEnded);
        setSelectedCardIndex(bodyCellData.length - 1);
      }
    }
  };

  return (
    <div className="word-card__shadow-container">
      <div className="word-card__container">
        <Arrow
          src={"../assets/images/left-arrow.png"}
          alt={"left-arrow"}
          onClick={handleClickPrev}
          className={classnames("", {
            hidden: selectedCardIndex === 0,
          })}
        />
        {cardsEnded ? (
          <div className="word-card">
            <div className="cl-btn-2" onClick={props.onclickCardClose}>
              <div>
                <div className="leftright"></div>
                <div className="rightleft"></div>
                <span className="close-btn">закрыть</span>
              </div>
            </div>
            <img
              src="../assets/images/check-mark.png"
              alt="check-mark"
              className="word-card__img"
            />
            <p className="word-card__text">Вы просмотрели все карточки!</p>
          </div>
        ) : (
          <WordCard
            english={bodyCellData[selectedCardIndex].english}
            russian={bodyCellData[selectedCardIndex].russian}
            transcription={bodyCellData[selectedCardIndex].transcription}
            onClick={handleChange}
            onClick1={handleChange}
            clicked={clicked}
            selectedCardIndex={props.learnedRowIndex}
            {...props}
          />
        )}

        {cardsEnded ? (
          <div className="word-card__img-container" />
        ) : (
          <Arrow
            src={"../assets/images/right-arrow.png"}
            alt={"right-arrow"}
            onClick={handleClickNext}
            className={""}
          />
        )}
      </div>
      <p className="word-card__pages">
        {selectedCardIndex + 1} / {bodyCellData.length}
      </p>
    </div>
  );
};

export default WordCardContainer;
