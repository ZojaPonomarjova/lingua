import "./buttonsRow.scss";
import { Button } from "../../button";
import React from "react";

//компонент кнопка с карандашом для редактирования текста в таблице
const EditButton = props => {
  return (
    <React.Fragment>
      <Button
        alt="pencil"
        src="../assets/images/pencil.png"
        type="buttonEdit"
        text={"Редактировать"}
        onClick={props.onClickEditWord}
      />
    </React.Fragment>
  );
};

//компонент кнопка с листочками для показа карточек в таблице
const LearnButton = props => {
  return (
    <React.Fragment>
      <Button
        alt="confetti"
        src="../assets/images/sticky-notes.png"
        type="buttonLearn"
        text={"Учить слова"}
        onClick={props.onClickLearn}
      />
    </React.Fragment>
  );
};

//компонент кнопки с хлопушкой для выученного слова
const KnownButton = props => {
  return (
    <React.Fragment>
      <Button
        alt="confetti"
        src="../assets/images/confetti.png"
        type="buttonKnown"
        text={"Знаю слово!"}
        onClick={props.addWordToKnown}
        disabled={props.disabled}
      />
    </React.Fragment>
  );
};

//компонент кнопки добавления слов в "мои слова"
const AddButton = props => {
  return (
    <React.Fragment>
      <Button
        alt="icon-add"
        src="../assets/images/icon-add.png"
        type="buttonKnown"
        text={"Добавить в 'Мои слова'"}
        onClick={props.addWordToMyWords}
        disabled={props.disabled}
      />
    </React.Fragment>
  );
};

//компонент кнопки удаления слова
const DeleteButton = props => {
  return (
    <React.Fragment>
      <Button
        alt="icon-delete"
        src="../assets/images/basket.svg"
        type="buttonKnown"
        text={"Удалить слово"}
        onClick={props.onClickDeleteWord}
        // disabled={props.disabled}
      />
    </React.Fragment>
  );
};

//Компонент для ряда из трех кнопок в таблице "мои слова"
const ButtonsRow = ({ onClickLearn, ...props }) => {
  return (
    <div className="table__button-row">
      <EditButton onClickEditWord={props.onClickEditWord} />
      <LearnButton onClickLearn={onClickLearn} clicked={props.clicked} />
      <KnownButton
        addWordToKnown={props.addWordToKnown}
        disabled={props.addedToKnown}
      />
    </div>
  );
};

//компонент для ряда кнопок в таблице рекомендуемые слова

const ButtonsRowRecommendedWords = ({ onClickLearn, ...props }) => {
  return (
    <div className="table__button-row">
      <AddButton
        addWordToMyWords={props.addWordToMyWords}
        disabled={props.clickedToAdd}
      />
      <LearnButton onClickLearn={onClickLearn} clicked={props.clicked} />
      {/* <KnownButton /> */}
    </div>
  );
};

//компонент для ряда кнопок в таблице выученные слова

const ButtonsRowKnownWords = ({ onClickLearn, ...props }) => {
  return (
    <div className="table__button-row">
      <DeleteButton onClickDeleteWord={props.onClickDeleteWord} />
      <LearnButton onClickLearn={onClickLearn} clicked={props.clicked} />
    </div>
  );
};

export { ButtonsRow, ButtonsRowRecommendedWords, ButtonsRowKnownWords };
