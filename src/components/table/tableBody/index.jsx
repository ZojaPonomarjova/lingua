import React, { useState } from "react";
import "./tableBody.scss";
import { inject, observer } from "mobx-react";
import { BodyRow, BodyRowChange } from "./bodyRows";

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

  //функция отправляет изменения на сервер и закрывает режим редактирования
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

export default inject(({ dataStore }) => {
  const { handleClickToSendChanges, isWordChanged, data } = dataStore;

  return {
    handleClickToSendChanges,
    isWordChanged,
    data,
  };
})(observer(BodyRowSelection));
