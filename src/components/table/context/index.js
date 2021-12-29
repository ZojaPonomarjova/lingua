import React, { useState, useEffect } from "react";
const DataContext = React.createContext();

const DataContextProvider = props => {
  //слова для генерации таблицы
  const [data, setData] = useState([]);
  //состояние для запуска лоадера
  const [isWordsLoading, setIsWordsLoading] = useState(false);

  //состояние для сохранения ошибки
  const [errorLoading, setErrorLoading] = useState("");

  //функция для обновления слов. Будем вызывать в других компонентах, когда меняем данные
  const wordsArrUpdate = () => {
    setErrorLoading("");
    setIsWordsLoading(true);
    fetch(" /api/words")
      .then(response => response.json())
      .then(words => {
        try {
          console.log(words);
          setData(words);
          setIsWordsLoading(false);
          // setTimeout(() => setIsWordsLoading(false), 5000);
          if (words.length === 0) {
            throw new ReferenceError("Что-то пошло не так.");
          }
          if (words === undefined) {
            throw new ReferenceError(
              "Попробуйте повторить запрос: пришли некорректные данные.",
            );
          }
        } catch (error) {
          console.log(error);
          setIsWordsLoading(false);
          setErrorLoading(error);
        }
      })
      .catch(error => {
        console.log(error);
        setIsWordsLoading(false);
        setErrorLoading("Проверьте свое соединение с сетью");
      });
  };

  //при загрузке приложения обращаемся к серверу
  useEffect(() => {
    wordsArrUpdate();
  }, []);

  return (
    <DataContext.Provider
      value={{ data, isWordsLoading, errorLoading, wordsArrUpdate }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContextProvider, DataContext };
