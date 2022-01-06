import "./main.scss";
import Title from "../titles";
import React from "react";
import WordCardContainer from "../wordCard/wordCardContainer";
import { useState } from "react";

import TableKnownWords from "../table/tableKnownWords";

//компонент для показа выученных слов
const KnownWords = () => {
  //   useEffect(() => {
  //     if (localStorage.getItem("myWords") === null) {
  //       localStorage.setItem("myWords", "[]");
  //     }
  //   }, []);
  //функция для показа карточки при нажатии на кнопку учить слова
  const [clicked, setClicked] = useState(null);
  const handleClickToLearn = i => {
    setClicked(i);
  };
  const knownWordsArr = JSON.parse(localStorage.getItem("knownWords"));
  return (
    <React.Fragment>
      <Title name={"Изученные слова"} />
      <TableKnownWords onClickLearn={handleClickToLearn} />

      {clicked != null ? (
        <WordCardContainer
          selected={clicked}
          handleClickToLearn={handleClickToLearn}
          arrayToShow={knownWordsArr}
        />
      ) : null}
    </React.Fragment>
  );
};

export default KnownWords;
