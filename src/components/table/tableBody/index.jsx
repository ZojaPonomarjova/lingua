import React, { useState } from "react";
import "./tableBody.scss";
import { Button, ButtonRow, SaveButton } from "../button";

const Bodycell = ({ text }) => {
  return (
    <td className="table__body-cell">
      <p className="table__text">{text}</p>{" "}
    </td>
  );
};

const BodyCellChange = ({ english, text, defaultValue }) => {
  const [value, setValue] = useState(defaultValue || "");

  return (
    <td className="table__body-cell">
      <input
        type="text"
        name={english}
        id={text}
        className="table__input"
        defaultValue={value}
        onChange={event => setValue(event.target.value)}
      />
    </td>
  );
};

const BodyRow = ({
  english,
  transcription,
  russian,

  index,
  onClick,
  ...props
}) => {
  return (
    <React.Fragment>
      <Bodycell text={index} />
      <Bodycell text={english} />
      <Bodycell text={transcription} />
      <Bodycell text={russian} />
      {/* <Bodycell text={tags} /> */}
      <td className="table__body-cell  table__body-cell_buttons">
        <ButtonRow onClick={onClick} onClick1={props.onClick1} />
      </td>
    </React.Fragment>
  );
};

const BodyRowChange = ({
  english,
  transcription,
  russian,
  index,
  ...props
}) => {
  return (
    <React.Fragment>
      <Bodycell text={index} english={english} />
      <BodyCellChange
        defaultValue={english}
        english={english}
        value={english}
      />
      <BodyCellChange
        defaultValue={transcription}
        english={english}
        value={transcription}
      />
      <BodyCellChange
        defaultValue={russian}
        english={english}
        value={russian}
      />
      {/* <Bodycell text={tags} /> */}
      <td className="table__body-cell table__body-cell_buttons">
        <div className="table__button-row">
          <SaveButton />
          <Button
            alt="Arrow"
            src="../assets/images/arrow.png"
            class="button__cancel"
            onClick={props.onClick}
          />
        </div>
      </td>
    </React.Fragment>
  );
};

const BodyRowSelection = ({
  english,
  transcription,
  russian,
  // tags,
  index,
  isChanged,
  ...props
}) => {
  return (
    <tr className="table__body-row">
      {isChanged ? (
        <BodyRowChange
          english={english}
          transcription={transcription}
          russian={russian}
          index={index}
          onClick={props.onClick}
        />
      ) : (
        <BodyRow
          english={english}
          transcription={transcription}
          russian={russian}
          index={index}
          onClick={props.onClick}
          onClick1={props.onClick1}
        />
      )}
    </tr>
  );
};

export { BodyRowSelection };
