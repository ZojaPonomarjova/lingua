import "./main.scss";
import Title from "../titles";
import Table from "../table/tableCommon";
// import WordCardContainer from "../wordCard/wordCardContainer";
// import { useState } from "react";
// import { bodyCellData } from "../table/tableData/bodyCellData";
// import Loader from "../loader";
import { Switch, Route } from "react-router-dom";
import PageNotFound from "../pageNotFound";

const titles = [
  "Рекомендуемые слова и наборы",
  "Мой словарь",
  "Добавьте свое слово",
];

function Main(props) {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/my-words">
          <Title name={titles[1]} />
          <Table {...props} />
        </Route>
        <Route exact path="/add-word">
          <Title name={titles[2]} />
        </Route>
        <Route exact path="/">
          <Title name={titles[0]} />
        </Route>
        <Route component={PageNotFound} />
      </Switch>
    </main>
  );
}

export default Main;
