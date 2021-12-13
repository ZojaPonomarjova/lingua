import React, { useState, useEffect, useCallback } from "react";
import "../tableCommon/tableCommon.scss";
import HeaderRow from "../tableHeader";
import { bodyCellData } from "../tableData/bodyCellData";
import { BodyRowRecommendedWords } from "../tableBody";

//компонент таблица
const TableRecommendedWords = props => {
  const [myWordsArray, setMyWordsArray] = useState(
    JSON.parse(localStorage.getItem("myWords")) || [],
  );
  const [clickedToAdd, setClickedToAdd] = useState(false);
  //функция для редактирования строки и отмены редактирования строки
  //   const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

  //   const handleClick = id => {
  //     if (selectedRowIndex !== id) {
  //       setSelectedRowIndex(id);
  //     } else {
  //       setSelectedRowIndex(-1);
  //     }
  //   };

  //добавляем слова в массив
  const addWordToMyWords = word => {
    //если слова не было в массиве, добавляем его в массив
    if (myWordsArray.length > 0) {
      setMyWordsArray([...myWordsArray, word]);
    } else {
      const emptyArray = [];
      emptyArray.push(word);
      setMyWordsArray(emptyArray);
    }
    if (!myWordsArray.includes(word)) {
      setClickedToAdd(true);
    }
    console.log(myWordsArray);
  };

  // //обновляем массив в хранилище
  useEffect(() => {
    localStorage.setItem("myWords", JSON.stringify(myWordsArray));
  }, [myWordsArray]);
  console.log(localStorage.getItem("myWords"));

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
                <BodyRowRecommendedWords
                  //   onClickEditWord={() => handleClick(i)}
                  //   onClickCancel={() => handleClick(i)}
                  key={bodyRow.id}
                  id={bodyRow.id}
                  // index={i + 1}
                  english={bodyRow.english}
                  transcription={bodyRow.transcription}
                  russian={bodyRow.russian}
                  //   isChanged={i === selectedRowIndex}
                  onClickLearn={() => props.onClickLearn(i)}
                  clicked={props.clicked}
                  learnButtonIndex={i}
                  // tags={bodyRow.tags}
                  addWordToMyWords={() => addWordToMyWords(bodyRow)}
                  // clickedToAdd={clickedToAdd}
                  clickedToAdd={myWordsArray.includes(bodyRow)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TableRecommendedWords;
