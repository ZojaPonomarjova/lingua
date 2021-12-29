import "./wordCard.scss";
import WordCard from "./wordCard";
// import { bodyCellData } from "../tableData/bodyCellData";
import { useState, useCallback } from "react";
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
  const [selectedCardIndex, setSelectedCardIndex] = useState(props.selected);
  const [clickedShowTranslation, setComponent] = useState(false);
  const [cardsEnded, setCardsEnded] = useState(false);
  const [learnedWordsCount, setLearnedWordsCount] = useState(0);
  // const [clickedToCount, setClickedToCount] = useState(false);
  const [learnedWords, setLearnedWords] = useState([]);

  //функция для показа перевода и чтобы спрятать его)
  const arrayToShow = props.arrayToShow;
  const handleChange = () => {
    setComponent(!clickedShowTranslation);
  };

  //функция для перемотки вперед
  const handleClickNext = () => {
    const nextIndex = selectedCardIndex + 1;
    if (nextIndex < arrayToShow.length) {
      setSelectedCardIndex(nextIndex);
      if (clickedShowTranslation) {
        setComponent(!clickedShowTranslation);
      }
    } else if (nextIndex >= arrayToShow.length) {
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
        setSelectedCardIndex(arrayToShow.length - 1);
      }
    }
  };

  //при нажатии на кнопку сохраняем ид слова в массив

  //функция для показа количества выученных слов

  const showLearnedWordsCount = useCallback(
    word => {
      setLearnedWordsCount(learnedWordsCount + 1);
      // setClickedToCount(true);
      if (!learnedWords.includes(word)) {
        setLearnedWords([...learnedWords, word]);
      }
    },
    [learnedWords, learnedWordsCount],
  );
  if (!arrayToShow.length) {
    return null;
  }

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
            <div
              className="cl-btn-2"
              onClick={() => props.handleClickToLearn(null)}
            >
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
            english={arrayToShow[selectedCardIndex].english}
            russian={arrayToShow[selectedCardIndex].russian}
            transcription={arrayToShow[selectedCardIndex].transcription}
            id={arrayToShow[selectedCardIndex].id}
            showTranslationButtonOnClick={handleChange}
            // clickedToCount={clickedToCount}
            onClickHideTranslation={handleChange}
            clicked={clickedShowTranslation}
            selectedCardIndex={props.learnedRowIndex}
            handleClickToLearn={props.handleClickToLearn}
            onClickKnownWordCount={() =>
              showLearnedWordsCount(arrayToShow[selectedCardIndex].id)
            }
            islearned={learnedWords.includes(arrayToShow[selectedCardIndex].id)}
            // ref={ref}
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
        {selectedCardIndex + 1} / {arrayToShow.length}
      </p>
      {/*параграф для показа количества выученных слов*/}

      {learnedWordsCount > 0 && (
        <p className="word-card__words-count word-card__pages">
          Количество слов, выученных за тренировку: {learnedWordsCount}
          {/* За эту тренировку вы выучили {learnedWordsCount} слов */}
        </p>
      )}
    </div>
  );
};

export default WordCardContainer;
