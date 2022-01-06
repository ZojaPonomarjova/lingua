import React, { useState } from "react";
import "./tableBody.scss";
import { Button, SaveButton } from "../../button";
// import classnames from "classnames";
import {
  ButtonsRow,
  ButtonsRowRecommendedWords,
  ButtonsRowKnownWords,
} from "../buttonsRow";
import { inject, observer } from "mobx-react";

//компонент для клетки в таблице
const BodyCell = ({ text }) => {
  return (
    <td className="table__body-cell">
      <p className="table__text">{text}</p>
    </td>
  );
};

//компонент для клетки с инпутом внутри без форвардРеф на всякий случай)
const BodyCellChange = ({ name, text, ...props }) => {
  return (
    <td className="table__body-cell">
      <input
        type="text"
        name={name}
        id={text}
        className={`table__input ${props.className}`}
        onChange={props.onChangeWords}
        value={props.value}
      />
      <p className="body-cell__error">{props.errorText}</p>
    </td>
  );
};

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
      {/* <BodyCell text={index} /> */}
      <BodyCell text={english} />
      <BodyCell text={transcription} />
      <BodyCell text={russian} />
      {/* <BodyCell text={tags} /> */}
      <td className="table__body-cell  table__body-cell_buttons">
        <ButtonsRow
          onClickEditWord={onClickEditWord}
          onClickLearn={props.onClickLearn}
          clicked={props.clicked}
          learnButtonIndex={props.learnButtonIndex}
          addWordToKnown={props.addWordToKnown}
          addedToKnown={props.addedToKnown}
        />
      </td>
    </React.Fragment>
  );
};

//компонент ряд в таблице для изученных слов с кнопкой удалить

const BodyRowKnownWords = ({
  english,
  transcription,
  russian,
  // deleteWord,
  ...props
}) => {
  return (
    <tr className="table__body-row">
      {/* <BodyCell text={index} /> */}
      <BodyCell text={english} />
      <BodyCell text={transcription} />
      <BodyCell text={russian} />
      {/* <BodyCell text={tags} /> */}
      <td className="table__body-cell  table__body-cell_buttons">
        <ButtonsRowKnownWords
          // deleteWord={deleteWord}
          onClickLearn={props.onClickLearn}
          clicked={props.clicked}
          learnButtonIndex={props.learnButtonIndex}
          onClickDeleteWord={props.onClickDeleteWord}
        />
      </td>
    </tr>
  );
};

//компонент ряд в таблице с текстом и кнопками учить/добавить для рекомендованные слова
const BodyRowRecommendedWords = ({
  english,
  transcription,
  russian,

  ...props
}) => {
  return (
    <tr className="table__body-row">
      {/* <BodyCell text={index} /> */}
      <BodyCell text={english} />
      <BodyCell text={transcription} />
      <BodyCell text={russian} />
      {/* <BodyCell text={tags} /> */}
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
        errorText={props.englishErrorText}
        className={props.englishErrorText ? "input-error" : ""}
      />
      <BodyCellChange
        name="transcription"
        onChangeWords={props.onChangeWords}
        errorText={props.transcriptionErrorText}
        value={props.transcriptionValue}
        className={props.transcriptionErrorText ? "input-error" : ""}
      />
      <BodyCellChange
        name="russian"
        onChangeWords={props.onChangeWords}
        errorText={props.translationErrorText}
        value={props.translationValue}
        className={props.translationErrorText ? "input-error" : ""}
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

//проверка на ниличие русских и английских букв там, где не надо
const regForRussianLetters = /([а-я]+)/i;
const onlyLatinCharacters = value => {
  return /^[a-zA-Z\s]+$/.test(value);
};
const onlyRussianCharacters = value => {
  return /^[а-яё\s]+$/i.test(value);
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
  //состояние для value инпутов
  const [value, setValue] = useState({
    english: english,
    transcription: transcription,
    russian: russian,
  });

  //состояние для текста ошибок
  const [errors, setErrors] = useState({
    english: "",
    transcription: "",
    russian: "",
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
    if (event.target.value === "") {
      setErrors({
        ...errors,
        [event.target.name]: "Эта графа не должна быть пустой",
      });
    } else if (
      event.target.name === "english" &&
      !onlyLatinCharacters(event.target.value)
    ) {
      setErrors({
        ...errors,
        english: "Используйте только латинские буквы",
      });
    } else if (
      event.target.name === "transcription" &&
      event.target.value.match(regForRussianLetters) !== null
    ) {
      setErrors({
        ...errors,
        transcription:
          "Используйте только латинские буквы и специальные символы",
      });
    } else if (
      event.target.name === "russian" &&
      !onlyRussianCharacters(event.target.value)
    ) {
      setErrors({
        ...errors,
        russian: "Используйте только русские буквы",
      });
    } else {
      setErrors({
        ...errors,
        [event.target.name]: "",
      });
    }
  };

  //функция выводит измененное состояние в консоль и закрывает режим редактирования
  const handleClickToSave = (index, id, value) => {
    props.handleClickToSendChanges(id, value);
    props.handleChangeWord(index);
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
            handleClickToSave(props.selectedRowIndexForEditing, props.id, value)
          }
          // handleClickToSave={props.handleClickToSave}
          handleChangeWord={props.handleChangeWord}
          // selectedRowIndex={props.selectedRowIndex}
          selectedRowIndexForEditing={props.selectedRowIndexForEditing}
          translationValue={value.russian}
          onChangeWords={onChangeWords}
          translationErrorText={errors.russian}
          transcriptionValue={value.transcription}
          transcriptionErrorText={errors.transcription}
          englishValue={value.english}
          englishErrorText={errors.english}
        />
      ) : (
        <BodyRow
          english={value.english}
          transcription={value.transcription}
          russian={value.russian}
          index={index}
          onClickEditWord={props.onClickEditWord}
          onClickLearn={props.onClickLearn}
          clicked={props.clicked}
          learnButtonIndex={props.learnButtonIndex}
          addWordToKnown={props.addWordToKnown}
          addedToKnown={props.addedToKnown}
        />
      )}
    </tr>
  );
};
export { BodyRowRecommendedWords, BodyRowKnownWords };
export default inject(({ dataStore }) => {
  const { handleClickToSendChanges, isWordChanged, data } = dataStore;

  return {
    handleClickToSendChanges,
    isWordChanged,
    data,
  };
})(observer(BodyRowSelection));
