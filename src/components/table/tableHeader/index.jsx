import "./tableHeader.scss";
// import { tableHeaderData } from "../tableData/tableHeaderData";

//компонент для клетки в шапке таблицы
const HeaderCell = ({ text }) => {
  return <th className="table__header-cell">{text}</th>;
};

//компонент для самой шапки таблицы
const HeaderRow = () => {
  return (
    <tr className="table__header-row">
      <HeaderCell text="English" />
      <HeaderCell text="Transcription" />
      <HeaderCell text="Russian" />
      <HeaderCell text="" />
    </tr>
  );
};
export default HeaderRow;
