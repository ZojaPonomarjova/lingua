import React, { useState } from "react";
import "./tableBody.scss";
import { Button, SaveButton } from "../button";
import ButtonsRow from "../buttonsRow";

//компонент для клетки в таблице
const Bodycell = ({ text }) => {
  return (
    <td className="table__body-cell">
      <p className="table__text">{text}</p>
    </td>
  );
};

//компонент для клетки с инпутом внутри
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

//компонент ряд в таблице с текстом и кнопками учить/редактировать
const BodyRow = ({
  english,
  transcription,
  russian,

  index,
  onClickEditWord,
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
        <ButtonsRow
          onClickEditWord={onClickEditWord}
          onClickLearn={props.onClickLearn}
          clicked={props.clicked}
        />
      </td>
    </React.Fragment>
  );
};

//компонент ряд в таблице для редактирования слова с кнопками сохранить/отмена
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
            type="cancelButton"
            onClick={props.onClickCancel}
          />
        </div>
      </td>
    </React.Fragment>
  );
};

//компонент выбора типа строки при изменения props.isChanged
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
          onClickCancel={props.onClickCancel}
        />
      ) : (
        <BodyRow
          english={english}
          transcription={transcription}
          russian={russian}
          index={index}
          onClickEditWord={props.onClickEditWord}
          onClickLearn={props.onClickLearn}
          clicked={props.clicked}
        />
      )}
    </tr>
  );
};

export { BodyRowSelection };
