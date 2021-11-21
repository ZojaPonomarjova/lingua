import "./main.scss";
import Title from "../titles";
import Table from "../table/tableCommon";
import WordCard from "../wordCard";

const titles = ["Рекомендуемые слова и наборы", "Мой словарь"];

function Main() {
  return (
    <main className="main">
      <Title name={titles[1]} />
      <Table />
      <WordCard />
    </main>
  );
}

export default Main;
