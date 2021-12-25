import React, { useState, useEffect } from "react";
const DataContext = React.createContext();

const DataContextProvider = props => {
  const [data, setData] = useState([]);
  const [isWordsLoading, setIsWordsLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState("");
  // const [wordsArrChanged, setWordsArrChanged] = useState(false);
  useEffect(() => {
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
  }, []);

  const wordsArrUpdate = () => {
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
  return (
    <DataContext.Provider
      value={{ data, isWordsLoading, errorLoading, wordsArrUpdate }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContextProvider, DataContext };
