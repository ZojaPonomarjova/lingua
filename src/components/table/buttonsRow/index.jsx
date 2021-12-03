import "./buttonsRow.scss";
import { Button } from "../button";
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
const KnownButton = () => {
  return (
    <React.Fragment>
      <Button
        alt="sticky-notes"
        src="../assets/images/confetti.png"
        type="buttonKnown"
        text={"Знаю слово!"}
        onClick={undefined}
      />
    </React.Fragment>
  );
};

//Компонент для ряда из трех кнопок в таблице
const ButtonsRow = ({ onClickLearn, ...props }) => {
  return (
    <div className="table__button-row">
      <EditButton onClickEditWord={props.onClickEditWord} />
      <LearnButton onClickLearn={onClickLearn} clicked={props.clicked} />
      <KnownButton />
    </div>
  );
};

export default ButtonsRow;
