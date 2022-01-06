import "./main.scss";
import Title from "../titles";
import React from "react";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import PageNotFound from "../pageNotFound";
import CollectionCard from "../collectionCard";
import TextLoader from "../textLoader/textLoader";
import { inject, observer } from "mobx-react";
import RecommendedWords from "./recommendedWords";
import AddWord from "../addWord";
import KnownWords from "./knownWords";
import MyWords from "./myWords";

//массив с заголовками для страниц
const titles = [
  "Рекомендуемые слова",
  "Мой словарь",
  "Добавьте свое слово",
  "Изученные слова",
];

//компонент для главной страницы
const MainPage = props => {
  const myWordsArr = JSON.parse(localStorage.getItem("myWords"));
  const knownWordsArr = JSON.parse(localStorage.getItem("knownWords"));
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

//делаем Switch, чтобы в main рендерились разные компоненты
const Main = props => {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/my-words" component={MyWords} />
        <Route exact path="/add-word">
          <Title name={titles[2]} />
          <AddWord />
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
  const { data, getData, handleClickToDelete } = dataStore;
  useEffect(() => {
    getData();
  });
  return {
    data,
    getData,
    handleClickToDelete,
  };
})(observer(Main));
//Main;
