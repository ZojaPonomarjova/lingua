import React, { useState } from "react";
import "./tableCommon.scss";
import HeaderRow from "../tableHeader";
import { bodyCellData } from "../tableData/bodyCellData";
import { BodyRowSelection } from "../tableBody";

//компонент таблица
const Table = props => {
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
                  id={bodyRow.id}
                  // index={i + 1}
                  english={bodyRow.english}
                  transcription={bodyRow.transcription}
                  russian={bodyRow.russian}
                  isChanged={i === selectedRowIndex}
                  onClickLearn={() => props.onClickLearn(i)}
                  clicked={props.clicked}
                  learnButtonIndex={i}
                  // tags={bodyRow.tags}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Table;
