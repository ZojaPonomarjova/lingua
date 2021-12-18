import React, { useState, useRef, forwardRef } from "react";
import "./tableBody.scss";
import { Button, SaveButton } from "../button";
import classnames from "classnames";
import {
  ButtonsRow,
  ButtonsRowRecommendedWords,
  ButtonsRowKnownWords,
} from "../buttonsRow";

//компонент для клетки в таблице
const Bodycell = ({ text }) => {
  return (
    <td className="table__body-cell">
      <p className="table__text">{text}</p>
    </td>
  );
};

//компонент для клетки с инпутом внутри без форвардРеф на всякий случай)
// const BodyCellChange = ({ name, text, defaultValue, ...props }) => {
//   // const [value, setValue] = useState(defaultValue || "");
//   const className = classnames("table__input", {
//     "input-error": props.inputError && name === props.inputWithErrorName,
//     // "": props.type === undefined,
//   });
//   return (
//     <td className="table__body-cell">
//       <input
//         type="text"
//         name={name}
//         id={text}
//         className={className}
//         onChange={props.onChangeWords}
//         defaultValue={defaultValue}
//       />
//     </td>
//   );
// };
const BodyCellChange = forwardRef(function BodyCellChange(
  { name, text, defaultValue, ...props },
  ref,
) {
  const className = classnames("", {
    // "input-error": props.inputError,
    // "": props.inputError === false,
  });
  return (
    <td className="table__body-cell">
      <input
        type="text"
        name={name}
        id={text}
        className={`table__input ${className}`}
        onChange={props.onChangeWords}
        // defaultValue={defaultValue}
        value={props.value}
        ref={ref}
      />
      <p className="body-cell__error">{props.errorText}</p>
    </td>
  );
});

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
      {/* <Bodycell text={index} /> */}
      <Bodycell text={english} />
      <Bodycell text={transcription} />
      <Bodycell text={russian} />
      {/* <Bodycell text={tags} /> */}
      <td className="table__body-cell  table__body-cell_buttons">
        <ButtonsRow
          onClickEditWord={onClickEditWord}
          onClickLearn={props.onClickLearn}
          clicked={props.clicked}
          learnButtonIndex={props.learnButtonIndex}
        />
      </td>
    </React.Fragment>
  );
};

//компонент ряд в таблице с текстом и кнопками учить/редактировать для рекомендованные слова
const BodyRowRecommendedWords = ({
  english,
  transcription,
  russian,

  ...props
}) => {
  return (
    <tr className="table__body-row">
      {/* <Bodycell text={index} /> */}
      <Bodycell text={english} />
      <Bodycell text={transcription} />
      <Bodycell text={russian} />
      {/* <Bodycell text={tags} /> */}
      <td className="table__body-cell  table__body-cell_buttons">
        <ButtonsRowRecommendedWords
          // onClickEditWord={onClickEditWord}
          onClickLearn={props.onClickLearn}
          clicked={props.clicked}
          learnButtonIndex={props.learnButtonIndex}
          addWordToMyWords={props.addWordToMyWords}
          clickedToAdd={props.clickedToAdd}
        />
      </td>
    </tr>
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
      {/* <Bodycell text={index} english={english} /> */}
      <BodyCellChange
        // defaultValue={english}
        name="english"
        value={props.englishValue}
        onChangeWords={props.onChangeWords}
        ref={props.englishRef}
        errorText={props.englishErrorText}
      />
      <BodyCellChange
        // defaultValue={transcription}
        name="transcription"
        value={props.transcriptionValue}
        onChangeWords={props.onChangeWords}
        ref={props.transcriptionRef}
        errorText={props.transcriptionErrorText}
      />
      <BodyCellChange
        // defaultValue={russian}
        name="translation"
        value={props.translationValue}
        onChangeWords={props.onChangeWords}
        ref={props.translationRef}
        errorText={props.translationErrorText}
      />
      {/* <Bodycell text={tags} /> */}
      <td className="table__body-cell table__body-cell_buttons">
        <div className="table__button-row">
          <SaveButton
            saveOnClick={props.handleClickToSave}
            disabled={
              props.translationErrorText !== "" ||
              props.transcriptionErrorText !== "" ||
              props.englishErrorText !== ""
            }
          />
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
          saveOnClick={props.saveOnClick}
          handleClickToSave={props.handleClickToSave}
          value={props.value}
          onChangeWords={props.onChangeWords}
          translationRef={props.translationRef}
          translationErrorText={props.translationErrorText}
          transcriptionRef={props.transcriptionRef}
          transcriptionErrorText={props.transcriptionErrorText}
          englishRef={props.englishRef}
          englishErrorText={props.englishErrorText}
          englishValue={props.englishValue}
          transcriptionValue={props.transcriptionValue}
          translationValue={props.translationValue}
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
          learnButtonIndex={props.learnButtonIndex}
        />
      )}
    </tr>
  );
};

export { BodyRowSelection, BodyRowRecommendedWords };
