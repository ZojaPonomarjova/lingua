import "./main.scss";
import Title from "../titles";

import Table from "../table/tableCommon";

const titles = ["Рекомендуемые слова и наборы", "Мой словарь"];

function Main() {
  return (
    <main className="main">
      <Title name={titles[1]} />
      <Table />
    </main>
  );
}

export default Main;
