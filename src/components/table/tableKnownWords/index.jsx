import React, { useState, useEffect } from "react";
// import "../tableCommon/tableCommon.scss";
import HeaderRow from "../tableHeader";
import { BodyRowKnownWords } from "../tableBody/bodyRows";
import ErrorMessage from "../../errorMessage";
import { observer, inject } from "mobx-react";
import "./tableKnownWords.scss";

//компонент таблица
const TableKnownWords = props => {
  const [knownWordsArr, setKnownWordsArr] = useState(
    JSON.parse(localStorage.getItem("knownWords")) || [],
  );

  //функция для удаления слова и удаления слова из массива
  const handleClickDeleteWord = (wordId, word) => {
    //убираем из массива с изученными словами те, которые удалили
    props.handleClickToDelete(wordId, word);
    // if (props.isDeleted) {
    // console.log(props.isDeleted);
    const knownWordsArrUpdate = knownWordsArr.filter(item => {
      // if (item.id !== wordId) {
      return item.id !== wordId;
      // }
    });
    setKnownWordsArr(knownWordsArrUpdate);
    // }
  };

  useEffect(() => {
    localStorage.setItem("knownWords", JSON.stringify(knownWordsArr));
  }, [knownWordsArr]);
  return (
    <React.Fragment>
      {knownWordsArr?.length === 0 ? (
        //Если в хранилище нет ни одного слова, выводим ошибку
        <ErrorMessage
          errorText={`Вы не добавили ни одного слова. Чтобы добавить слово, зайдите в раздел
          "Мои слова" и нажмите кнопку "Знаю слово!"`}
        />
      ) : (
        <div className="scroll-table">
          <table className="table">
            <thead>
              <HeaderRow />
            </thead>
          </table>
          <div className="scroll-table-body">
            <table className="table">
              <tbody>
                {knownWordsArr?.map((bodyRow, i) => (
                  <BodyRowKnownWords
                    onClickEditWord={() => {
                      props.handleChangeWord(i);
                    }}
                    // onClickCancel={() => props.handleChangeWord(i)}
                    key={bodyRow.id}
                    id={bodyRow.id}
                    // index={i + 1}
                    english={bodyRow.english}
                    transcription={bodyRow.transcription}
                    russian={bodyRow.russian}
                    isChanged={i === props.selectedRowIndex}
                    onClickLearn={() => props.onClickLearn(i)}
                    clicked={props.clicked}
                    learnButtonIndex={i}
                    saveOnClick={() => props.saveOnClick(i)}
                    selectedRowIndex={props.selectedRowIndex}
                    selectedRowIndexForEditing={i}
                    handleChangeWord={props.handleChangeWord}
                    onClickDeleteWord={() =>
                      handleClickDeleteWord(bodyRow.id, bodyRow)
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {props.isDeleted === false ? (
        <p className="known-words__error">
          При удалении слова произошла ошибка. Пожалуйста, повторите попытку.
        </p>
      ) : null}
    </React.Fragment>
  );
};
export default inject(({ dataStore }) => {
  const {
    handleClickToDelete,
    getData,
    handleClickToAdd,
    handleClickToSendChanges,
    data,
    isDeleted,
  } = dataStore;

  return {
    handleClickToDelete,
    data,
    isDeleted,
    getData,
    handleClickToAdd,

    handleClickToSendChanges,
  };
})(observer(TableKnownWords));
