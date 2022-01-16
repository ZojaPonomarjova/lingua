import "./buttonsRow.scss";

import {
  EditButton,
  LearnButton,
  KnownButton,
  AddButton,
  DeleteButton,
} from "./buttons";

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
