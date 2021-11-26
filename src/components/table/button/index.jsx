import "./button.scss";

const buttonsData = [
  { alt: "pencil", src: "../assets/images/pencil.png" },
  { alt: "sticky-notes", src: "../assets/images/sticky-notes.png" },
  { alt: "confetti", src: "../assets/images/confetti.png" },
];

const Button = ({ alt, src, onClick, ...props }) => {
  return (
    <div className="button__container">
      <div className={`table__button ${props.class}`} onClick={onClick}>
        <img src={src} alt={alt} className="button__img" />
      </div>
      <div className={`button__hidden-text ${props.classForText}`}>
        {props.text}
      </div>
    </div>
  );
};

const ButtonRow = ({ onClick, ...props }) => {
  return (
    <div className="table__button-row">
      {buttonsData.map((button, index) => (
        <Button
          key={button.alt}
          alt={button.alt}
          src={button.src}
          class={""}
          classForText={
            index === 0
              ? "button_edit"
              : index === 1
              ? "button_learn"
              : "button_known"
          }
          onClick={
            index === 0 ? onClick : index === 1 ? props.onClick1 : undefined
          }
          text={
            index === 0
              ? "Редактировать"
              : index === 1
              ? "Учить слова"
              : "Знаю слово!"
          }
        />
      ))}
    </div>
  );
};

const SaveButton = () => {
  return <div className="table__save-button">Сохранить</div>;
};

export { ButtonRow, SaveButton, Button };
