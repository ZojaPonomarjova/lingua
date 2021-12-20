import React, { useState, useRef } from "react";
import "./tableCommon.scss";
import HeaderRow from "../tableHeader";
// import { bodyCellData } from "../tableData/bodyCellData";
import { BodyRowSelection } from "../tableBody";

//компонент таблица
const Table = props => {
  // //функция для редактирования строки и отмены редактирования строки
  // const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

  // const handleChangeWord = id => {
  //   if (selectedRowIndex !== id) {
  //     setSelectedRowIndex(id);
  //   } else {
  //     setSelectedRowIndex(-1);
  //   }
  // };

  //Достаем из хранилища массив со словами для генерации таблицы
  const myWordsArr = JSON.parse(localStorage.getItem("myWords")) || [];

  return (
    <React.Fragment>
      <div className="scroll-table">
        <table className="table">
          <thead>
            <HeaderRow />
          </thead>
        </table>
        <div className="scroll-table-body">
          <table className="table">
            <tbody>
              {myWordsArr?.length === 0 ? (
                <p>Вы не добавили ни одного слова</p>
              ) : (
                myWordsArr?.map((bodyRow, i) => (
                  <BodyRowSelection
                    onClickEditWord={() => {
                      props.handleChangeWord(i);
                      // resetValue(i);
                    }}
                    onClickCancel={() => props.handleChangeWord(i)}
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
                    // isClickedToSave={() => props.handleClickToSave(i)}
                    handleChangeWord={props.handleChangeWord}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Table;
