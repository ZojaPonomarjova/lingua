import { useState, useContext } from "react";
import "./addWord.scss";
import { DataContext } from "../table/context";

//проверка на ниличие русских и английских букв там, где не надо
const regForRussianLetters = /([а-я]+)/i;
const onlyLatinCharacters = value => {
  return /^[a-zA-Z\s]+$/.test(value);
};
const onlyRussianCharacters = value => {
  return /^[а-яё\s]+$/i.test(value);
};

const AddWord = () => {
  //состояние для value инпутов
  const [value, setValue] = useState({
    english: "",
    transcription: "",
    russian: "",
    tags: "",
  });

  //состояние для текста ошибок
  const [errors, setErrors] = useState({
    englishError: "",
    transcriptionError: "",
    russianError: "",
    tagsError: "",
  });

  const { wordsArrUpdate } = useContext(DataContext);

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
        [event.target.name + "Error"]: "Эта графа не должна быть пустой",
      });
    } else if (
      event.target.name === "english" &&
      !onlyLatinCharacters(event.target.value)
    ) {
      setErrors({
        ...errors,
        englishError: "Используйте только латинские буквы",
      });
    } else if (
      event.target.name === "transcription" &&
      event.target.value.match(regForRussianLetters) !== null
    ) {
      setErrors({
        ...errors,
        transcriptionError:
          "Используйте только латинские буквы и специальные символы",
      });
    } else if (
      event.target.name === "russian" &&
      !onlyRussianCharacters(event.target.value)
    ) {
      setErrors({
        ...errors,
        russianError: "Используйте только русские буквы",
      });
    } else {
      setErrors({
        ...errors,
        [event.target.name + "Error"]: "",
      });
    }
    console.log(value);
  };

  const handleClickToAdd = () => {
    // console.log(value);
    if (
      value.transcription !== "" ||
      value.english !== "" ||
      value.russian !== ""
    ) {
      fetch(`/api/words/add`, {
        method: "POST",
        body: JSON.stringify(value),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => console.log(error));
      setValue({ english: "", transcription: "", russian: "", tags: "" });
    }
    wordsArrUpdate();
  };
  return (
    <div>
      <label htmlFor="english" className="input__label">
        Английский вариант
      </label>
      <br />
      <input
        type="text"
        name="english"
        value={value.english}
        onChange={onChangeWords}
        className={`table__input add-input ${
          errors.englishError ? "input-error" : ""
        }`}
      />
      <p className="body-cell__error add-error">{errors.englishError}</p>
      <label htmlFor="transcription" className="input__label">
        Транскрипция
      </label>
      <br />
      <input
        type="text"
        name="transcription"
        value={value.transcription}
        onChange={onChangeWords}
        className={`table__input  add-input ${
          errors.transcriptionError ? "input-error" : ""
        }`}
      />
      <p className="body-cell__error add-error">{errors.transcriptionError}</p>
      <label htmlFor="russian" className="input__label">
        Русский вариант
      </label>
      <br />
      <input
        type="text"
        name="russian"
        value={value.russian}
        onChange={onChangeWords}
        className={`table__input add-input ${
          errors.russianError ? "input-error" : ""
        }`}
      />
      <p className="body-cell__error add-error">{errors.russianError}</p>
      <label htmlFor="tags" className="input__label">
        Тэг
      </label>
      <br />
      <input
        type="text"
        name="tags"
        value={value.tags}
        onChange={onChangeWords}
        className={`table__input add-input ${
          errors.tagsError ? "input-error" : ""
        }`}
      />
      <p className="body-cell__error add-error">{errors.tagsError}</p>
      <br />
      <button
        type="button"
        disabled={
          errors.russianError !== "" ||
          errors.transcriptionError !== "" ||
          errors.englishError !== "" ||
          errors.tagsError !== "" ||
          value.transcription === "" ||
          value.russian === "" ||
          value.english === ""
        }
        onClick={handleClickToAdd}
        className="word-card__show-button add-button"
      >
        Добавить
      </button>
    </div>
  );
};

export default AddWord;
