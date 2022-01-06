// import "./tableBody.scss";

//компонент для клетки в таблице
const BodyCell = ({ text }) => {
  return (
    <td className="table__body-cell">
      <p className="table__text">{text}</p>
    </td>
  );
};

//компонент для клетки с инпутом внутри без форвардРеф на всякий случай)
const BodyCellChange = ({ name, text, ...props }) => {
  return (
    <td className="table__body-cell">
      <input
        type="text"
        name={name}
        id={text}
        className={`table__input ${props.className}`}
        onChange={props.onChangeWords}
        value={props.value}
      />
      <p className="body-cell__error">{props.errorText}</p>
    </td>
  );
};

export { BodyCell, BodyCellChange };
