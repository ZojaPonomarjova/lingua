import React, { useState } from "react";
import "./tableCommon.scss";
import HeaderRow from "../tableHeader";
import { bodyCellData } from "../tableData/bodyCellData";
import { BodyRowSelection } from "../tableBody";
import WordCardContainer from "../wordCard/wordCardContainer";

const Table = () => {
  const [learnedRowIndex, setLearnedRowIndex] = useState(-1);
  const handleClickToLearn = id => {
    if (learnedRowIndex !== id) {
      setLearnedRowIndex(id);
    } else {
      setLearnedRowIndex(-1);
    }
  };
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
      <table className="table">
        <thead>
          <HeaderRow />
        </thead>
        <tbody>
          {bodyCellData.map((bodyRow, i) => (
            <BodyRowSelection
              onClick={() => handleClick(i)}
              key={bodyRow.id}
              // index={props.i}

              english={bodyRow.english}
              transcription={bodyRow.transcription}
              russian={bodyRow.russian}
              isChanged={i === selectedRowIndex}
              onClick1={() => handleClickToLearn(i)}
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
    </React.Fragment>
  );
};

export default Table;
