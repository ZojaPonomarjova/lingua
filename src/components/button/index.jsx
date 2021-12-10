import "./button.scss";
import classnames from "classnames";
import { useEffect, useRef, forwardRef } from "react";

//компонент кнопка с рисунком внутри
const Button = ({ alt, src, onClick, ...props }) => {
  //пропсы для передачи класса внутрь кнопки
  const className = classnames("", {
    button__cancel: props.type === "cancelButton",
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
      <div className={`table__button ${className}`} onClick={onClick}>
        <img src={src} alt={alt} className="button__img" />
      </div>
      <div className={`button__hidden-text ${classForText}`}>{props.text}</div>
    </div>
  );
};

//кнопка показать перевод
const ShowTranslationButton = (props, ref) => {
  // const ref = useRef();
  // useEffect(() => ref.current.focus(), []);
  // console.log(ref);
  return (
    <input
      type="button"
      value="Показать перевод"
      className="word-card__show-button"
      onClick={props.ShowTranslationButtonOnClick}
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
