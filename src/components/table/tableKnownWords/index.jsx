import React, { useState, useEffect, useContext } from "react";
import "../tableCommon/tableCommon.scss";
import HeaderRow from "../tableHeader";
// import { bodyCellData } from "../tableData/bodyCellData";
import { BodyRowKnownWords } from "../tableBody";
import { DataContext } from "../context";
import ErrorMessage from "../errorMessage";

//компонент таблица
const TableKnownWords = props => {
  //вытаскиваем из контекста функцию для обновления слов
  const { wordsArrUpdate } = useContext(DataContext);
  //сохраняем в состояние слова из хранилища
  const [knownWordsArrNew, setKnownWordsArrNew] = useState(
    JSON.parse(localStorage.getItem("knownWords")) || [],
  );

  //функция для удаления слов
  const handleClickToDelete = (wordId, word) => {
    // console.log(wordId);
    // console.log(word);

    fetch(`/api/words/${wordId}/delete`, {
      method: "POST",
      body: JSON.stringify(word),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error));

    //убираем из массива с изученными словами те, которые удалили
    const knownWordsArrUpdate = knownWordsArrNew.filter(item => {
      if (item.id !== wordId) {
        return item;
      }
    });
    //обновляем состояние
    setKnownWordsArrNew(knownWordsArrUpdate);
    //обновляем слова, приходящие с сервера
    wordsArrUpdate();
    // console.log(knownWordsArrUpdate);
  };

  //обновляем массив в хранилище
  useEffect(() => {
    localStorage.setItem("knownWords", JSON.stringify(knownWordsArrNew));
  }, [knownWordsArrNew]);
  return (
    <React.Fragment>
      {knownWordsArrNew?.length === 0 ? (
        //Если в хранилище нет ни одного слова, выводим ошибку
        <ErrorMessage
          errorText={`Вы не добавили ни одного слова. Чтобы добавить слово, зайдите в раздел
          &quot;Мои слова&quot; и нажмите кнопку &quot;Знаю слово!&quot;`}
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
                {knownWordsArrNew?.map((bodyRow, i) => (
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
                    onClickDeleteWord={() =>
                      handleClickToDelete(bodyRow.id, bodyRow)
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

export default TableKnownWords;
