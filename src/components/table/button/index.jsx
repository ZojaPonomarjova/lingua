import "./button.scss";

const buttonsData = [
  { alt: "pencil", src: "../assets/images/pencil.png" },
  { alt: "sticky-notes", src: "../assets/images/sticky-notes.png" },
  { alt: "confetti", src: "../assets/images/confetti.png" },
];

const Button = ({ alt, src }) => {
  return (
    <div className="table__button">
      <img src={src} alt={alt} className="button__img" />
    </div>
  );
};

const ButtonRow = () => {
  return (
    <div className="table__button-row">
      {buttonsData.map(button => (
        <Button key={button.alt} alt={button.alt} src={button.src} />
      ))}
    </div>
  );
};

const SaveButton = () => {
  return <div className="table__save-button">Сохранить</div>;
};

export { ButtonRow, SaveButton };
