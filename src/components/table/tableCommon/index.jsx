import React from "react";
import "./tableCommon.scss";
import HeaderRow from "../tableHeader";
import BodyRowSelection from "../tableBody";
import ErrorMessage from "../../errorMessage";
import { observer, inject } from "mobx-react";

//компонент таблица
const Table = props => {
  return (
    <React.Fragment>
      {props.myWordsArray?.length === 0 ? (
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
                {props.myWordsArray?.map((bodyRow, i) => (
                  <BodyRowSelection
                    onClickEditWord={() => {
                      props.handleChangeWord(i);
                    }}
                    onClickCancel={() => {
                      // props.handleChangeWord(i);
                      props.handleChangeWord;
                    }}
                    indexForEditCancel={i}
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
                    addWordToKnown={() => props.addWordToKnownWords(bodyRow)}
                    // addedToKnown={
                    //   IdArrForKnownWords
                    //     ?
                    //     IdArrForKnownWords.includes(bodyRow.id) ||
                    //       knownWordsIdArr.includes(bodyRow.id)
                    //     : false
                    // }
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default inject(({ dataStore }) => {
  const {
    addWordToKnownWords,
    knownWordsArray,

    myWordsArray,
  } = dataStore;
  return {
    addWordToKnownWords,
    knownWordsArray,

    myWordsArray,
  };
})(observer(Table));
// export default Table;
