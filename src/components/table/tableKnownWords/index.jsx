import React from "react";
import "../tableCommon/tableCommon.scss";
import HeaderRow from "../tableHeader";
import { BodyRowKnownWords } from "../tableBody";

//компонент таблица
const TableKnownWords = props => {
  const knownWordsArr = JSON.parse(localStorage.getItem("knownWords")) || [];
  return (
    <React.Fragment>
      {knownWordsArr?.length === 0 ? (
        <p className="table__error-message">
          Вы не добавили ни одного слова. Чтобы добавить слово, зайдите в раздел
          &quot;Мои слова&quot; и нажмите кнопку &quot;Знаю слово!&quot;
        </p>
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

export default TableKnownWords;
