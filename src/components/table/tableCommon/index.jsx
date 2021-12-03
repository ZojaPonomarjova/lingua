import React, { useState } from "react";
import "./tableCommon.scss";
import HeaderRow from "../tableHeader";
import { bodyCellData } from "../tableData/bodyCellData";
import { BodyRowSelection } from "../tableBody";
import WordCardContainer from "../wordCard/wordCardContainer";

//компонент таблица
const Table = props => {
  // //функция для показа карточки при нажатии на кнопку учить слова
  const [learnedRowIndex, setLearnedRowIndex] = useState(-1);
  const handleClickToLearn = id => {
    if (learnedRowIndex !== id) {
      setLearnedRowIndex(id);
    } else {
      setLearnedRowIndex(-1);
    }
  };

  //функция для редактирования строки и отмены редактирования строки
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

  const handleClick = id => {
    if (selectedRowIndex !== id) {
      setSelectedRowIndex(id);
    } else {
      setSelectedRowIndex(-1);
    }
  };

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
              {bodyCellData.map((bodyRow, i) => (
                <BodyRowSelection
                  onClickEditWord={() => handleClick(i)}
                  onClickCancel={() => handleClick(i)}
                  key={bodyRow.id}
                  // id={bodyRow.id}
                  index={i + 1}
                  english={bodyRow.english}
                  transcription={bodyRow.transcription}
                  russian={bodyRow.russian}
                  isChanged={i === selectedRowIndex}
                  // onClickLearn={props.onClickLearn}
                  id={props.id}
                  learnedRowIndex={selectedRowIndex}
                  clicked={props.clicked}
                  onClickLearn={() => handleClickToLearn(i)}
                  // tags={bodyRow.tags}
                />
              ))}
            </tbody>
          </table>
          {learnedRowIndex >= 0 ? (
            <WordCardContainer
              learnedRowIndex={learnedRowIndex}
              onclickCardClose={() => {
                setLearnedRowIndex(-1);
              }}
            />
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Table;
