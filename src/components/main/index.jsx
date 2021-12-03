import "./main.scss";
import Title from "../titles";
import Table from "../table/tableCommon";
import React from "react";
// import WordCardContainer from "../wordCard/wordCardContainer";
// import { useState } from "react";
// import { bodyCellData } from "../table/tableData/bodyCellData";
// import Loader from "../loader";
import { Switch, Route } from "react-router-dom";
import PageNotFound from "../pageNotFound";

//массив с заголовками для страниц
const titles = [
  "Рекомендуемые слова и наборы",
  "Мой словарь",
  "Добавьте свое слово",
];

//компонент для таблицы со словами пользователя
const MyWords = props => {
  // console.log("MyWords", props);

  //функция для показа карточки при нажатии на кнопку учить слова
  // const [learnedRowIndex, setLearnedRowIndex] = useState(-1);
  // const handleClickToLearn = id => {
  //   if (learnedRowIndex !== id) {
  //     setLearnedRowIndex(id);
  //   } else {
  //     setLearnedRowIndex(-1);
  //   }
  // };

  // console.log(isClicked);
  return (
    <React.Fragment>
      <Title name={titles[1]} />
      <Table
        {...props}
        // onClickLearn={() => handleClickToLearn()}
      />
      {/* {learnedRowIndex >= 0 ? (
        <WordCardContainer
          learnedRowIndex={learnedRowIndex}
          onclickCardClose={() => {
            setLearnedRowIndex(-1);
          }}
        />
      ) : null} */}
    </React.Fragment>
  );
};

//компонент для главной страницы
const MainPage = () => {
  return (
    <React.Fragment>
      <Title name={titles[0]} />
    </React.Fragment>
  );
};

//делаем Switch, чтобы в main рендерились разные компоненты
const Main = () => {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/my-words" component={MyWords} />
        <Route exact path="/add-word">
          <Title name={titles[2]} />
        </Route>
        <Route exact path="/" component={MainPage} />
        <Route component={PageNotFound} />
      </Switch>
    </main>
  );
};

export default Main;
