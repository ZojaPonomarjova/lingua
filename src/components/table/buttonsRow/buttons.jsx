import "./buttonsRow.scss";
import { Button } from "../../button";
import React from "react";
import pencil from "../../assets/images/pencil.png";
import notes from "../../assets/images/sticky-notes.png";
import confetti from "../../assets/images/confetti.png";
import addButton from "../../assets/images/icon-add.png";
import deleteButton from "../../assets/images/basket.svg";

//компонент кнопка с карандашом для редактирования текста в таблице
const EditButton = props => {
  return (
    <React.Fragment>
      <Button
        alt="pencil"
        src={pencil}
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
        alt="notes"
        src={notes}
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
        src={confetti}
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
        src={addButton}
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
        src={deleteButton}
        type="buttonKnown"
        text={"Удалить слово"}
        onClick={props.onClickDeleteWord}
      />
    </React.Fragment>
  );
};

export { EditButton, LearnButton, KnownButton, AddButton, DeleteButton };
