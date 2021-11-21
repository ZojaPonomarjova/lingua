import "./tableHeader.scss";
import { tableHeaderData } from "../tableData/tableHeaderData";

const HeaderCell = ({ text }) => {
  return <th className="table__header-cell">{text}</th>;
};

const HeaderRow = () => {
  return (
    <tr className="table__header-row">
      {tableHeaderData.map(headerCellData => (
        <HeaderCell
          key={headerCellData.headerText}
          text={headerCellData.headerText}
        />
      ))}
    </tr>
  );
};
export default HeaderRow;
