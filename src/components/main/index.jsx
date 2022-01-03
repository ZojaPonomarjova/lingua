import "./main.scss";
import Title from "../titles";
import Table from "../table/tableCommon";
import React from "react";
import WordCardContainer from "../wordCard/wordCardContainer";
import { useState, useEffect } from "react";
import { bodyCellData } from "../table/tableData/bodyCellData";
// import Loader from "../loader";
import { Switch, Route } from "react-router-dom";
import PageNotFound from "../pageNotFound";
import CollectionCard from "../collectionCard";
import TextLoader from "../textLoader/textLoader";
// import TableRecommendedWords from "../table/tableRecommendedWords/tableRecommendedWords";
import TableKnownWords from "../table/tableKnownWords";
import { inject, observer } from "mobx-react";
import RecommendedWords from "./recommendedWords";

//массив с заголовками для страниц
const titles = [
  "Рекомендуемые слова",
  "Мой словарь",
  "Добавьте свое слово",
  "Изученные слова",
];

//компонент для таблицы со словами пользователя
const MyWords = props => {
  //функция для показа карточки при нажатии на кнопку учить слова
  const [clicked, setClicked] = useState(null);
  const handleClickToLearn = i => {
    setClicked(i);
  };

  //функция для редактирования строки и отмены редактирования строки
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const handleChangeWord = id => {
    if (selectedRowIndex !== id) {
      setSelectedRowIndex(id);
    } else {
      setSelectedRowIndex(-1);
    }
  };

  // console.log(isClicked);
  return (
    <React.Fragment>
      <Title name={titles[1]} />
      <Table
        {...props}
        onClickLearn={handleClickToLearn}
        handleChangeWord={handleChangeWord}
        selectedRowIndex={selectedRowIndex}
      />
      {clicked != null ? (
        <WordCardContainer
          selected={clicked}
          handleClickToLearn={handleClickToLearn}
          arrayToShow={JSON.parse(localStorage.getItem("myWords")) || []}
        />
      ) : null}
    </React.Fragment>
  );
};
const myWordsArr = JSON.parse(localStorage.getItem("myWords"));
const knownWordsArr = JSON.parse(localStorage.getItem("knownWords"));
//компонент для главной страницы
const MainPage = props => {
  return (
    <React.Fragment>
      <Title name={titles[0]} />
      <CollectionCard
        cardTitle="Рекомендуемые слова"
        type="commonWords"
        collectionCardPath="/recommended-words"
        linkText="Посмотреть"
        amount={props.data?.length || <TextLoader />}
      />
      <Title name={titles[1]} />
      <div className="main__collection-cards-container">
        <CollectionCard
          cardTitle="Слова для изучения"
          type="myWords"
          collectionCardPath="/my-words"
          amount={myWordsArr?.length || "0"}
          linkText="Посмотреть"
        />
        <CollectionCard
          cardTitle="Выученные слова"
          type="knownWords"
          collectionCardPath="/known-words"
          linkText="Повторим?"
          amount={knownWordsArr?.length || "0"}
        />
      </div>
    </React.Fragment>
  );
};

// //компонент для страницы с рекомендованными словами
// const RecommendedWords = props => {
//   //функция для показа карточки при нажатии на кнопку учить слова
//   useEffect(() => {
//     if (localStorage.getItem("myWords") === null) {
//       localStorage.setItem("myWords", "[]");
//     }
//   }, []);

//   const [clicked, setClicked] = useState(null);
//   const handleClickToLearn = i => {
//     setClicked(i);
//   };
//   return (
//     <React.Fragment>
//       <Title name={titles[0]} />
//       <TableRecommendedWords
//         onClickLearn={handleClickToLearn}
//         data={props.data}
//       />
//       {clicked != null ? (
//         <WordCardContainer
//           selected={clicked}
//           handleClickToLearn={handleClickToLearn}
//           arrayToShow={bodyCellData}
//         />
//       ) : null}
//     </React.Fragment>
//   );
// };

// inject(({ dataStore }) => {
//   const { data, getData } = dataStore;
//   useEffect(() => {
//     getData();
//   });
//   return {
//     data,
//     getData,
//   };
// })(observer(RecommendedWords));

//компонент для показа выученных слов
const KnownWords = () => {
  //функция для показа карточки при нажатии на кнопку учить слова
  useEffect(() => {
    if (localStorage.getItem("myWords") === null) {
      localStorage.setItem("myWords", "[]");
    }
  }, []);

  const [clicked, setClicked] = useState(null);
  const handleClickToLearn = i => {
    setClicked(i);
  };
  return (
    <React.Fragment>
      <Title name={titles[3]} />
      <TableKnownWords onClickLearn={handleClickToLearn} />
      {clicked != null ? (
        <WordCardContainer
          selected={clicked}
          handleClickToLearn={handleClickToLearn}
          arrayToShow={knownWordsArr}
        />
      ) : null}
    </React.Fragment>
  );
};

//делаем Switch, чтобы в main рендерились разные компоненты
const Main = props => {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/my-words" component={MyWords} />
        <Route exact path="/add-word">
          <Title name={titles[2]} />
        </Route>
        <Route
          exact
          path="/recommended-words"
          // component={RecommendedWords}
          // data={props.data}
        >
          <RecommendedWords data={props.data} />
        </Route>
        <Route exact path="/known-words" component={KnownWords} />

        <Route
          exact
          path="/"
          // component={MainPage} data={props.data}
        >
          <MainPage data={props.data} />
        </Route>
        <Route component={PageNotFound} />
      </Switch>
    </main>
  );
};

export default inject(({ dataStore }) => {
  const { data, getData } = dataStore;
  useEffect(() => {
    getData();
  });
  return {
    data,
    getData,
  };
})(observer(Main));
//Main;
