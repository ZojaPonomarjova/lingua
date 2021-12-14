import React, { useState, useEffect, useCallback } from "react";
import "../tableCommon/tableCommon.scss";
import HeaderRow from "../tableHeader";
import { bodyCellData } from "../tableData/bodyCellData";
import { BodyRowRecommendedWords } from "../tableBody";

//компонент таблица
const TableRecommendedWords = props => {
  //массив для сохранения слов в localStorage
  const [myWordsArray, setMyWordsArray] = useState(
    JSON.parse(localStorage.getItem("myWords")) || [],
  );
  //отдельный массив с ид, чтобы по ним дизэйблить кнопку добавления. Иначе не смогла
  const [idArr, setIdArr] = useState(
    JSON.parse(localStorage.getItem("myWordsId")) || [],
  );

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
    if (!JSON.parse(localStorage.getItem("myWords")).includes(word)) {
      //если длина массива больше ноля, то myWordsArray является итерируемым и мы можем так сделать
      if (myWordsArray.length > 0) {
        setMyWordsArray([...myWordsArray, word]);
        setIdArr([...idArr, word.id]);
      } else {
        //Если нет, то сделала добавление нового слова через копию массива
        const emptyArray = [];
        emptyArray.push(word);
        setMyWordsArray(emptyArray);
        const emptyArray1 = [];
        emptyArray1.push(word.id);
        setIdArr(emptyArray1);
      }
    }
  };

  // //обновляем массив в хранилище
  useEffect(() => {
    localStorage.setItem("myWords", JSON.stringify(myWordsArray));
    localStorage.setItem("myWordsId", JSON.stringify(idArr));
  }, [myWordsArray, idArr]);

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
                  clickedToAdd={
                    JSON.parse(localStorage.getItem("myWordsId"))
                      ? JSON.parse(localStorage.getItem("myWordsId")).includes(
                          bodyRow.id,
                        )
                      : false
                  }
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
