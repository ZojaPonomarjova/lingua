import "./button.scss";
import classnames from "classnames";
import { forwardRef } from "react";

//компонент кнопка с рисунком внутри
const Button = ({ alt, src, onClick, ...props }) => {
  //пропсы для передачи класса внутрь кнопки
  const className = classnames("", {
    button__cancel: props.type === "cancelButton",
    disabled: props.disabled,
    "": props.type === undefined,
  });
  // const classForText = classnames("", {
  //   button_edit: props.type === "buttonEdit",
  //   button_learn: props.type === "buttonLearn",
  //   button_known: props.type === "buttonKnown",
  //   // "": props.type === undefined,
  // });

  return (
    <div className="button__container">
      <button
        className={`table__button ${className}`}
        onClick={onClick}
        disabled={props.disabled}
        type="button"
        // ref={ref}
      >
        <img src={src} alt={alt} className="button__img" />
      </button>
      <div className={`button__hidden-text `}>{props.text}</div>
    </div>
  );
};

//кнопка показать перевод
const ShowTranslationButton = (props, ref) => {
  return (
    <input
      type="button"
      value="Показать перевод"
      className="word-card__show-button"
      onClick={props.showTranslationButtonOnClick}
      ref={ref}
    />
  );
};

export default forwardRef(ShowTranslationButton);
//компонент кнопка "сохранить"

// const SaveButton = () => {
//   return <div className="table__save-button">Сохранить</div>;
// };

export { Button };
