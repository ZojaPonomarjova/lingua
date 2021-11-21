import { useState } from "react";
import "./tableCommon.scss";
import HeaderRow from "../tableHeader";
import { bodyCellData } from "../tableData/bodyCellData";
import { BodyRowSelection } from "../tableBody";

const Table = () => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const handleClick = id => {
    if (selectedRowIndex !== id) {
      setSelectedRowIndex(id);
    } else {
      setSelectedRowIndex(-1);
    }
  };

  return (
    <table className="table">
      <thead>
        <HeaderRow />
      </thead>
      <tbody>
        {bodyCellData.map((bodyRow, index) => (
          <BodyRowSelection
            onClick={() => handleClick(index)}
            key={bodyRow.id}
            index={index + 1}
            english={bodyRow.english}
            transcription={bodyRow.transcription}
            russian={bodyRow.russian}
            isChanged={index === selectedRowIndex}

            // tags={bodyRow.tags}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
