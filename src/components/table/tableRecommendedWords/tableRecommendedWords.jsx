import React from "react";
import "../tableCommon/tableCommon.scss";
import HeaderRow from "../tableHeader";
import { BodyRowRecommendedWords } from "../tableBody/bodyRows";
import Loader from "../../loader";
import { observer, inject } from "mobx-react";
import ErrorMessage from "../../errorMessage";

//компонент таблица
const TableRecommendedWords = ({ data, ...props }) => {
  //если возникла ошибка при получении данных с сервера, показываем ошибку
  if (props.errorTextForGetData) {
    return <ErrorMessage errorText={props.errorTextForGetData} />;
  }
  return (
    <React.Fragment>
      {!props.isWordsLoading ? (
        <Loader />
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
                {data?.map((bodyRow, i) => (
                  <BodyRowRecommendedWords
                    key={bodyRow.id}
                    id={bodyRow.id}
                    english={bodyRow.english}
                    transcription={bodyRow.transcription}
                    russian={bodyRow.russian}
                    onClickLearn={() => props.onClickLearn(i)}
                    clicked={props.clicked}
                    learnButtonIndex={i}
                    addWordToMyWords={() => props.addWordToMyWords(bodyRow)}
                    clickedToAdd={props.myWordsIdArr.includes(bodyRow.id)}
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

export default inject(({ dataStore }) => {
  const {
    isWordsLoading,
    errorTextForGetData,
    addWordToMyWords,
    myWordsArray,
    myWordsIdArr,
  } = dataStore;
  return {
    isWordsLoading,
    errorTextForGetData,
    addWordToMyWords,
    myWordsArray,
    myWordsIdArr,
  };
})(observer(TableRecommendedWords));
