import "./button.scss";
import classnames from "classnames";
import { forwardRef } from "react";

// //компонент кнопка с рисунком внутри
const Button = ({ alt, src, onClick, ...props }) => {
  //пропсы для передачи класса внутрь кнопки
  const className = classnames("", {
    button__cancel: props.type === "cancelButton",
    disabled: props.disabled,
    null: props.type === undefined,
  });
  const classForText = classnames("", {
    button_edit: props.type === "buttonEdit",
    button_learn: props.type === "buttonLearn",
    button_known: props.type === "buttonKnown",
    null: props.type === undefined,
  });

  return (
    <div className="button__container">
      <button
        className={`table__button ${className}`}
        onClick={onClick}
        type="button"
        disabled={props.disabled}
      >
        <img src={src} alt={alt} className="button__img" />
      </button>
      <div className={`button__hidden-text ${classForText}`}>{props.text}</div>
    </div>
  );
};

//компонент кнопка "сохранить"

const SaveButton = props => {
  const className = classnames("table__save-button", {
    disabled: props.disabled,
  });
  return (
    <input
      type="button"
      className={className}
      onClick={props.saveOnClick}
      disabled={props.disabled}
      value="Сохранить"
    />
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

export { Button, SaveButton };
