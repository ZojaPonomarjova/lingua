import "./main.scss";
import Title from "../titles";
import Table from "../table/tableCommon";
import React from "react";
import WordCardContainer from "../wordCard/wordCardContainer";
import { useState } from "react";
import { inject, observer } from "mobx-react";

//компонент для таблицы со словами пользователя
const MyWords = props => {
  //функция для показа карточки при нажатии на кнопку учить слова
  const [clicked, setClicked] = useState(null);
  const handleClickToLearn = i => {
    setClicked(i);
  };

  //функция для редактирования строки и отмены редактирования строки
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const handleChangeWord = id => {
    if (selectedRowIndex !== id) {
      setSelectedRowIndex(id);
    } else {
      setSelectedRowIndex(-1);
    }
  };
  const myWordsArr = JSON.parse(localStorage.getItem("myWords"));
  return (
    <React.Fragment>
      <Title name={"Мой словарь"} />
      <Table
        {...props}
        onClickLearn={handleClickToLearn}
        handleChangeWord={handleChangeWord}
        selectedRowIndex={selectedRowIndex}
      />
      {props.isWordChanged === false && (
        <p className="known-words__error">
          При отправке слова произошла ошибка. Пожалуйста, повторите попытку.
        </p>
      )}
      {clicked != null ? (
        <WordCardContainer
          selected={clicked}
          handleClickToLearn={handleClickToLearn}
          arrayToShow={myWordsArr || []}
        />
      ) : null}
    </React.Fragment>
  );
};

export default inject(({ dataStore }) => {
  const { isWordChanged, handleClickToSendChanges } = dataStore;
  return {
    isWordChanged,
    handleClickToSendChanges,
  };
})(observer(MyWords));
