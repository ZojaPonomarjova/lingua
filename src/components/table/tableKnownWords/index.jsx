import React from "react";
import HeaderRow from "../tableHeader";
import { BodyRowKnownWords } from "../tableBody/bodyRows";
import ErrorMessage from "../../errorMessage";
import { observer, inject } from "mobx-react";
import "./tableKnownWords.scss";

//компонент таблица
const TableKnownWords = props => {
  return (
    <React.Fragment>
      {props.knownWordsArray?.length === 0 ? (
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
                {props.knownWordsArray?.map((bodyRow, i) => (
                  <BodyRowKnownWords
                    onClickEditWord={() => {
                      props.handleChangeWord(i);
                    }}
                    key={bodyRow.id}
                    id={bodyRow.id}
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
                      props.handleClickToDelete(bodyRow.id, bodyRow)
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
  const { handleClickToDelete, data, isDeleted, knownWordsArray } = dataStore;

  return {
    handleClickToDelete,
    data,
    isDeleted,
    knownWordsArray,
  };
})(observer(TableKnownWords));
