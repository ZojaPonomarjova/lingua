import "./main.scss";
import Title from "../titles";
import Table from "../table/tableCommon";
// import WordCardContainer from "../wordCard/wordCardContainer";
// import { useState } from "react";
// import { bodyCellData } from "../table/tableData/bodyCellData";

const titles = ["Рекомендуемые слова и наборы", "Мой словарь"];

function Main(props) {
  return (
    <main className="main">
      <Title name={titles[1]} />
      <Table {...props} />
      {/* <WordCardContainer /> */}
    </main>
  );
}

export default Main;
