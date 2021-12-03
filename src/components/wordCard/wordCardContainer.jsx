import "./wordCard.scss";
import WordCard from "./wordCard";
import { bodyCellData } from "../tableData/bodyCellData";
import { useState } from "react";
import classnames from "classnames";

//компонент для стрелок в карусели
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

//компонент родительский контейнер, в котором собирается карусель
const WordCardContainer = props => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [clickedShowTranslation, setComponent] = useState(false);
  const [cardsEnded, setCardsEnded] = useState(false);

  //функция для показа перевода и чтобы спрятать его)
  const handleChange = () => {
    setComponent(!clickedShowTranslation);
  };

  //функция для перемотки вперед
  const handleClickNext = () => {
    const nextIndex = selectedCardIndex + 1;
    if (nextIndex < bodyCellData.length) {
      setSelectedCardIndex(nextIndex);
      if (clickedShowTranslation) {
        setComponent(!clickedShowTranslation);
      }
    } else if (nextIndex >= bodyCellData.length) {
      setCardsEnded(true);
    }
  };

  //функция для перемотки назад
  const handleClickPrev = () => {
    const nextIndex = selectedCardIndex - 1;
    if (nextIndex >= 0) {
      setSelectedCardIndex(nextIndex);
      if (clickedShowTranslation === true) {
        setComponent(!clickedShowTranslation);
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
            <div className="cl-btn-2" onClick={props.handleClickToLearn}>
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
            id={bodyCellData[selectedCardIndex].id}
            onClick={handleChange}
            onClickHideTranslation={handleChange}
            clicked={clickedShowTranslation}
            selectedCardIndex={props.learnedRowIndex}
            handleClickToLearn={props.handleClickToLearn}
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
        {/*параграф для показа номера текущей карточки и общего количества карточек*/}
        {selectedCardIndex + 1} / {bodyCellData.length}
      </p>
    </div>
  );
};

export default WordCardContainer;
