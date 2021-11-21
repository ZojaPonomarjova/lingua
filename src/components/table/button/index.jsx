import "./button.scss";

const buttonsData = [
  { alt: "pencil", src: "../assets/images/pencil.png" },
  { alt: "sticky-notes", src: "../assets/images/sticky-notes.png" },
  { alt: "confetti", src: "../assets/images/confetti.png" },
];

const Button = ({ alt, src, onClick, ...props }) => {
  return (
    <div className={`table__button ${props.class}`} onClick={onClick}>
      <img src={src} alt={alt} className="button__img" />
    </div>
  );
};

const ButtonRow = ({ onClick }) => {
  return (
    <div className="table__button-row">
      {buttonsData.map((button, index) => (
        <Button
          key={button.alt}
          alt={button.alt}
          src={button.src}
          class={""}
          onClick={index === 0 ? onClick : undefined}
        />
      ))}
    </div>
  );
};

const SaveButton = () => {
  return <div className="table__save-button">Сохранить</div>;
};

export { ButtonRow, SaveButton, Button };
