import React, { useState, useEffect } from "react";
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
  //массив для сохранения изученных слов в localStorage
  const [knownWordsArray, setKnownWordsArray] = useState(
    JSON.parse(localStorage.getItem("knownWords")) || [],
  );
  //отдельный массив с ид изученных слов, чтобы по ним дизэйблить кнопку добавления. Иначе не смогла
  const [knownWordsIdArr, setKnownWordsIdArr] = useState(
    JSON.parse(localStorage.getItem("knownWordsId")) || [],
  );

  //массив для сохранения моих слов в localStorage
  const [myWordsArray, setMyWordsArray] = useState(
    JSON.parse(localStorage.getItem("myWords")) || [],
  );

  //добавляем слова в массив
  const addWordToKnownWords = word => {
    //если слова не было в массиве, добавляем его в массив
    if (!JSON.parse(localStorage.getItem("knownWords")).includes(word)) {
      //если длина массива больше ноля, то myWordsArray является итерируемым и мы можем так сделать
      if (knownWordsArray.length > 0) {
        setKnownWordsArray([...knownWordsArray, word]);
        setKnownWordsIdArr([...knownWordsIdArr, word.id]);
      } else {
        //Если нет, то сделала добавление нового слова через копию массива
        const emptyArray = [];
        emptyArray.push(word);
        setKnownWordsArray(emptyArray);
        const emptyArray1 = [];
        emptyArray1.push(word.id);
        setKnownWordsIdArr(emptyArray1);
      }
      //убираем из массива с моими словами выученные слова
      const myWordsArrUpdate = myWordsArray.filter(item => {
        if (!knownWordsIdArr.includes(item.id)) {
          return item;
        }
      });
      console.log(myWordsArrUpdate);
      setMyWordsArray(myWordsArrUpdate);
    }
  };

  // //обновляем массивы в хранилище
  useEffect(() => {
    localStorage.setItem("knownWords", JSON.stringify(knownWordsArray));
    localStorage.setItem("knownWordsId", JSON.stringify(knownWordsIdArr));
    localStorage.setItem("myWords", JSON.stringify(myWordsArray));
    //myWordsArray
  }, [knownWordsArray, knownWordsIdArr, myWordsArray]);

  const IdArrForKnownWords = JSON.parse(localStorage.getItem("knownWordsId"));

  //Достаем из хранилища массив со словами для генерации таблицы
  // const myWordsArr = JSON.parse(localStorage.getItem("myWords")) || [];

  return (
    <React.Fragment>
      {myWordsArray?.length === 0 ? (
        <p className="table__error-message">
          Вы не добавили ни одного слова. Чтобы добавить слово, зайдите в раздел
          &quot;Рекомендуемые слова&quot; и нажмите кнопку &quot;Добавить в
          &apos;Мои слова&apos;&quot;
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
                {myWordsArray?.map((bodyRow, i) => (
                  <BodyRowSelection
                    onClickEditWord={() => {
                      props.handleChangeWord(i);
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
                    handleChangeWord={props.handleChangeWord}
                    addWordToKnown={() => addWordToKnownWords(bodyRow)}
                    addedToKnown={
                      IdArrForKnownWords
                        ? IdArrForKnownWords.includes(bodyRow.id) ||
                          knownWordsIdArr.includes(bodyRow.id)
                        : false
                    }
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

export default Table;
