import "./table.scss";
import HeaderRow from "../tableHeader/index";
import { bodyCellData } from "./bodyCellData";
import { BodyRow } from "../tableBody";

const Table = () => {
  return (
    <table className="table">
      <thead>
        <HeaderRow />
      </thead>
      <tbody>
        {bodyCellData.map((bodyRow, index) => (
          <BodyRow
            key={bodyRow.id}
            index={index + 1}
            english={bodyRow.english}
            transcription={bodyRow.transcription}
            russian={bodyRow.russian}
            isChanged={bodyRow.isChanged}
            // tags={bodyRow.tags}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
