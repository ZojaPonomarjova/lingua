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

  //состояние для вывода текста ошибки под инпутами
  const [englishErrorText, setEnglishErrorText] = useState("");
  const [transcriptionErrorText, setTranscriptionErrorText] = useState("");
  const [translationErrorText, setTranslationErrorText] = useState("");
  //рефы для инпутов
  const englishRef = useRef();
  const transcriptionRef = useRef();
  const translationRef = useRef();

  //состояние для value инпутов
  const [value, setValue] = useState({
    english: "",
    transcription: "",
    translation: "",
  });

  //Достаем из хранилища массив со словами для генерации таблицы
  const myWordsArr = JSON.parse(localStorage.getItem("myWords"));
  //функция для сброса состояния инпутов к начальному значению, если нажимаем на кнопку отмена редактирования
  const resetValue = index => {
    setValue({
      english: myWordsArr[index].english,
      transcription: myWordsArr[index].transcription,
      translation: myWordsArr[index].russian,
    });
  };

  // console.log(myWordsArr[props.selectedRowIndex].english);
  //функция для внесения изменений в инпутах с проверкой на наличие ошибок
  const onChangeWords = event => {
    //сохраняем состояние при изменении слов в инпутах
    setValue({
      ...value,
      [event.target.name]: event.target.value
        .replace(/ +/g, " ")
        .trim()
        .toLowerCase(),
    });

    //проверка на ниличие русских и английских букв там, где не надо
    const rusReg = /^[а-яё\s]+$/gi;
    const regForRussianLetters = /([а-я]+)/iu;
    const engReg = /^[a-z\s]+$/gi;

    //функция для проверки соответствия регулярному выражению
    const testInput = (reg, str) => {
      return reg.test(str);
    };

    //Проверка на пустые строки для каждого компонента с инпутом

    //Для английского слова
    if (englishRef.current.value === "") {
      setEnglishErrorText("Эта графа не должна быть пустой");
      englishRef.current.className = "table__input input-error";
    } else if (!testInput(engReg, englishRef.current.value)) {
      setEnglishErrorText("Используйте только латинские буквы");
      englishRef.current.className = "table__input input-error";
    } else {
      setEnglishErrorText("");
      englishRef.current.className = "";
    }

    //Для транскрипции
    if (transcriptionRef.current.value === "") {
      setTranscriptionErrorText("Эта графа не должна быть пустой");
      transcriptionRef.current.className = "table__input input-error";
    } else if (
      transcriptionRef.current.value.match(regForRussianLetters) !== null
    ) {
      setTranscriptionErrorText(
        "Используйте только латинские буквы и специальные символы",
      );
      transcriptionRef.current.className = "table__input input-error";
    } else {
      setTranscriptionErrorText("");
      transcriptionRef.current.className = "";
    }

    //Для перевода
    if (translationRef.current.value === "") {
      setTranslationErrorText("Эта графа не должна быть пустой");
      translationRef.current.className = "table__input input-error";
    } else if (!testInput(rusReg, translationRef.current.value)) {
      setTranslationErrorText("Используйте только русские буквы");
      translationRef.current.className = "table__input input-error";
    } else {
      setTranslationErrorText("");
      translationRef.current.className = "";
    }
  };
  //функция выводит измененное состояние в консоль и закрывает режим редактирования
  const handleClickToSave = id => {
    console.log(value);
    props.handleChangeWord(id);
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
              {myWordsArr.length === 0 ? (
                <p>Вы не добавили ни одного слова</p>
              ) : (
                myWordsArr.map((bodyRow, i) => (
                  <BodyRowSelection
                    onClickEditWord={() => {
                      props.handleChangeWord(i);
                      resetValue(i);
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
                    handleClickToSave={() => handleClickToSave(i)}
                    value={value}
                    onChangeWords={onChangeWords}
                    translationRef={translationRef}
                    translationErrorText={translationErrorText}
                    transcriptionRef={transcriptionRef}
                    transcriptionErrorText={transcriptionErrorText}
                    englishRef={englishRef}
                    englishErrorText={englishErrorText}
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
