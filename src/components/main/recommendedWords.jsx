import "./main.scss";
import Title from "../titles";
import React from "react";
import WordCardContainer from "../wordCard";
import { useState, useEffect } from "react";
import TableRecommendedWords from "../table/tableRecommendedWords";

//компонент для страницы с рекомендованными словами
const RecommendedWords = props => {
  //функция для показа карточки при нажатии на кнопку учить слова
  useEffect(() => {
    if (localStorage.getItem("myWords") === null) {
      localStorage.setItem("myWords", "[]");
    }
  }, []);

  const [clicked, setClicked] = useState(null);
  const handleClickToLearn = i => {
    setClicked(i);
  };
  return (
    <React.Fragment>
      <Title name={"Рекомендуемые слова"} />
      <TableRecommendedWords
        onClickLearn={handleClickToLearn}
        data={props.data}
      />
      {clicked != null ? (
        <WordCardContainer
          selected={clicked}
          handleClickToLearn={handleClickToLearn}
          arrayToShow={props.data}
        />
      ) : null}
    </React.Fragment>
  );
};

export default RecommendedWords;
