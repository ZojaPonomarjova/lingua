import React, { forwardRef, useState, useRef } from "react";
import "./tableBody.scss";
import { Button, SaveButton } from "../button";
import classnames from "classnames";
import {
  ButtonsRow,
  ButtonsRowRecommendedWords,
  ButtonsRowKnownWords,
} from "../buttonsRow";

//компонент для клетки в таблице
const Bodycell = ({ text }) => {
  return (
    <td className="table__body-cell">
      <p className="table__text">{text}</p>
    </td>
  );
};

//компонент для клетки с инпутом внутри без форвардРеф на всякий случай)
// const BodyCellChange = ({ name, text, defaultValue, ...props }) => {
//   // const [value, setValue] = useState(defaultValue || "");
//   const className = classnames("table__input", {
//     "input-error": props.inputError && name === props.inputWithErrorName,
//     // "": props.type === undefined,
//   });
//   return (
//     <td className="table__body-cell">
//       <input
//         type="text"
//         name={name}
//         id={text}
//         className={className}
//         onChange={props.onChangeWords}
//         defaultValue={defaultValue}
//       />
//     </td>
//   );
// };
const BodyCellChange = forwardRef(function BodyCellChange(
  { name, text, ...props },
  ref,
) {
  const className = classnames("", {
    // "input-error": props.inputError,
    // "": props.inputError === false,
  });
  return (
    <td className="table__body-cell">
      <input
        type="text"
        name={name}
        id={text}
        className={`table__input ${className}`}
        onChange={props.onChangeWords}
        // defaultValue={defaultValue}
        value={props.value}
        ref={ref}
      />
      <p className="body-cell__error">{props.errorText}</p>
    </td>
  );
});

//компонент ряд в таблице с текстом и кнопками учить/редактировать
const BodyRow = ({
  english,
  transcription,
  russian,

  onClickEditWord,
  ...props
}) => {
  return (
    <React.Fragment>
      {/* <Bodycell text={index} /> */}
      <Bodycell text={english} />
      <Bodycell text={transcription} />
      <Bodycell text={russian} />
      {/* <Bodycell text={tags} /> */}
      <td className="table__body-cell  table__body-cell_buttons">
        <ButtonsRow
          onClickEditWord={onClickEditWord}
          onClickLearn={props.onClickLearn}
          clicked={props.clicked}
          learnButtonIndex={props.learnButtonIndex}
        />
      </td>
    </React.Fragment>
  );
};

//компонент ряд в таблице с текстом и кнопками учить/редактировать для рекомендованные слова
const BodyRowRecommendedWords = ({
  english,
  transcription,
  russian,

  ...props
}) => {
  return (
    <tr className="table__body-row">
      {/* <Bodycell text={index} /> */}
      <Bodycell text={english} />
      <Bodycell text={transcription} />
      <Bodycell text={russian} />
      {/* <Bodycell text={tags} /> */}
      <td className="table__body-cell  table__body-cell_buttons">
        <ButtonsRowRecommendedWords
          // onClickEditWord={onClickEditWord}
          onClickLearn={props.onClickLearn}
          clicked={props.clicked}
          learnButtonIndex={props.learnButtonIndex}
          addWordToMyWords={props.addWordToMyWords}
          clickedToAdd={props.clickedToAdd}
        />
      </td>
    </tr>
  );
};
//проверка на ниличие русских и английских букв там, где не надо
// const rusReg = /^[а-яё\s]+$/gi;
const regForRussianLetters = /([а-я]+)/i;
// const engReg = /^[a-z\s]+$/gi;

//функция для проверки соответствия регулярному выражению
// const testInput = (reg, str) => {
//   return reg.test(str);
// };

//компонент ряд в таблице для редактирования слова с кнопками сохранить/отмена
const BodyRowChange = ({
  onClickCancel,

  ...props
}) => {
  return (
    <React.Fragment>
      <BodyCellChange
        name="english"
        onChangeWords={props.onChangeWords}
        value={props.englishValue}
        ref={props.englishRef}
        errorText={props.englishErrorText}
      />
      <BodyCellChange
        name="transcription"
        onChangeWords={props.onChangeWords}
        ref={props.transcriptionRef}
        errorText={props.transcriptionErrorText}
        value={props.transcriptionValue}
      />
      <BodyCellChange
        name="translation"
        onChangeWords={props.onChangeWords}
        ref={props.translationRef}
        errorText={props.translationErrorText}
        value={props.translationValue}
      />
      <td className="table__body-cell table__body-cell_buttons">
        <div className="table__button-row">
          <SaveButton
            disabled={
              props.translationErrorText !== "" ||
              props.transcriptionErrorText !== "" ||
              props.englishErrorText !== ""
            }
            saveOnClick={props.saveOnClick}
          />
          <Button
            alt="Arrow"
            src="../assets/images/arrow.png"
            type="cancelButton"
            onClick={onClickCancel}
          />
        </div>
      </td>
    </React.Fragment>
  );
};

//компонент выбора типа строки при изменения props.isChanged
const BodyRowSelection = ({
  english,
  transcription,
  russian,
  // tags,
  index,
  isChanged,
  ...props
}) => {
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
    english: english,
    transcription: transcription,
    translation: russian,
  });

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

    //Проверка на пустые строки для каждого компонента с инпутом
    //Для английского слова
    if (englishRef.current.value === "") {
      setEnglishErrorText("Эта графа не должна быть пустой");
      englishRef.current.className = "table__input input-error";
    } else if (!/^[a-z\s]+$/gi.test(englishRef.current.value)) {
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
    } else if (!/^[а-яё\s]+$/gi.test(translationRef.current.value)) {
      setTranslationErrorText("Используйте только русские буквы");
      translationRef.current.className = "table__input input-error";
    } else {
      setTranslationErrorText("");
      translationRef.current.className = "";
    }
    console.log(value);
  };

  //функция выводит измененное состояние в консоль и закрывает режим редактирования
  const handleClickToSave = id => {
    console.log(value);
    props.handleChangeWord(id);
  };
  return (
    <tr className="table__body-row">
      {isChanged ? (
        <BodyRowChange
          english={english}
          transcription={transcription}
          russian={russian}
          index={index}
          onClickCancel={props.onClickCancel}
          saveOnClick={() =>
            handleClickToSave(props.selectedRowIndexForEditing)
          }
          handleClickToSave={props.handleClickToSave}
          handleChangeWord={props.handleChangeWord}
          // selectedRowIndex={props.selectedRowIndex}
          selectedRowIndexForEditing={props.selectedRowIndexForEditing}
          translationValue={value.translation}
          onChangeWords={onChangeWords}
          translationRef={translationRef}
          translationErrorText={translationErrorText}
          transcriptionValue={value.transcription}
          transcriptionRef={transcriptionRef}
          transcriptionErrorText={transcriptionErrorText}
          englishValue={value.english}
          englishRef={englishRef}
          englishErrorText={englishErrorText}
        />
      ) : (
        <BodyRow
          english={value.english}
          transcription={value.transcription}
          russian={value.translation}
          index={index}
          onClickEditWord={props.onClickEditWord}
          onClickLearn={props.onClickLearn}
          clicked={props.clicked}
          learnButtonIndex={props.learnButtonIndex}
        />
      )}
    </tr>
  );
};

export { BodyRowSelection, BodyRowRecommendedWords };
