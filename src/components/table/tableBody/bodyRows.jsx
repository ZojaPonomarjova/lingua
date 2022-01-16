import React from "react";
import "./tableBody.scss";
import { Button, SaveButton } from "../../button";
import {
  ButtonsRow,
  ButtonsRowRecommendedWords,
  ButtonsRowKnownWords,
} from "../buttonsRow";
import { BodyCell, BodyCellChange } from "./bodyCells";
import arrow from "../../assets/images/arrow.png";

//компонент ряд в таблице с текстом и кнопками учить/редактировать
const BodyRow = ({
  english,
  transcription,
  russian,

  onClickEditWord,
  ...props
}) => {
  return (
    <React.Fragment>
      <BodyCell text={english} dataLabel="english" />
      <BodyCell text={transcription} dataLabel="transcription" />
      <BodyCell text={russian} dataLabel="russian" />
      <td className="table__body-cell  table__body-cell_buttons">
        <ButtonsRow
          onClickEditWord={onClickEditWord}
          onClickLearn={props.onClickLearn}
          clicked={props.clicked}
          learnButtonIndex={props.learnButtonIndex}
          addWordToKnown={props.addWordToKnown}
          addedToKnown={props.addedToKnown}
        />
      </td>
    </React.Fragment>
  );
};

//компонент ряд в таблице для изученных слов с кнопкой удалить

const BodyRowKnownWords = ({
  english,
  transcription,
  russian,
  // deleteWord,
  ...props
}) => {
  return (
    <tr className="table__body-row">
      <BodyCell text={english} dataLabel="english" />
      <BodyCell text={transcription} dataLabel="transcription" />
      <BodyCell text={russian} dataLabel="russian" />
      <td className="table__body-cell  table__body-cell_buttons">
        <ButtonsRowKnownWords
          onClickLearn={props.onClickLearn}
          clicked={props.clicked}
          learnButtonIndex={props.learnButtonIndex}
          onClickDeleteWord={props.onClickDeleteWord}
        />
      </td>
    </tr>
  );
};

//компонент ряд в таблице с текстом и кнопками учить/добавить для рекомендованные слова
const BodyRowRecommendedWords = ({
  english,
  transcription,
  russian,

  ...props
}) => {
  return (
    <tr className="table__body-row">
      <BodyCell text={english} dataLabel="english" />
      <BodyCell text={transcription} dataLabel="transcription" />
      <BodyCell text={russian} dataLabel="russian" />
      <td className="table__body-cell  table__body-cell_buttons">
        <ButtonsRowRecommendedWords
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
  onClickCancel,

  ...props
}) => {
  return (
    <React.Fragment>
      <BodyCellChange
        name="english"
        onChangeWords={props.onChangeWords}
        value={props.englishValue}
        errorText={props.englishErrorText}
        className={props.englishErrorText ? "input-error" : ""}
      />
      <BodyCellChange
        name="transcription"
        onChangeWords={props.onChangeWords}
        errorText={props.transcriptionErrorText}
        value={props.transcriptionValue}
        className={props.transcriptionErrorText ? "input-error" : ""}
      />
      <BodyCellChange
        name="russian"
        onChangeWords={props.onChangeWords}
        errorText={props.translationErrorText}
        value={props.translationValue}
        className={props.translationErrorText ? "input-error" : ""}
      />
      <td className="table__body-cell table__body-cell_buttons">
        <div className="table__button-row">
          <SaveButton
            disabled={
              props.translationErrorText !== "" ||
              props.transcriptionErrorText !== "" ||
              props.englishErrorText !== ""
            }
            saveOnClick={props.saveOnClick}
          />
          <Button
            alt="Arrow"
            src={arrow}
            type="cancelButton"
            onClick={onClickCancel}
          />
        </div>
      </td>
    </React.Fragment>
  );
};

export { BodyRow, BodyRowChange, BodyRowRecommendedWords, BodyRowKnownWords };
