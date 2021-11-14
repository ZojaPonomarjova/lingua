import "./bodyCell.scss";
import { ButtonRow, SaveButton } from "../button";

const Bodycell = ({ text }) => {
  return <td className="table__body-cell">{text}</td>;
};

const BodyCellChange = ({ english, text, value }) => {

  return (
    <td className="table__body-cell">
      <input type="text" name={english} id={value} className="table__input"/>
    </td>
  );
};

const BodyRow = ({
  english,
  transcription,
  russian,
  tags,
  index,
  isChanged
}) => {
  return isChanged ? (
    <tr className="table__body-row">
      <Bodycell text={index} english={english} />
      <BodyCellChange value={english+index} english={english}/>
      <BodyCellChange value={transcription+index} english={english} />
      <BodyCellChange value={russian+index} english={english} />
      {/* <Bodycell text={tags} /> */}
      <td className="table__body-cell">
        <SaveButton />
      </td>
    </tr>
  ) : (
    <tr className="table__body-row">
      <Bodycell text={index} />
      <Bodycell text={english} />
      <Bodycell text={transcription} />
      <Bodycell text={russian} />
      {/* <Bodycell text={tags} /> */}
      <td className="table__body-cell">
        <ButtonRow />
      </td>
    </tr>
  );
};

// const BodyRowChange = ({
//   english,
//   transcription,
//   russian,
//   isChanged,
//   index,
// }) => {
//   return (
//     <tr className="table__body-row">
//       <Bodycell text={index} english={english} />
//       <BodyCellChange text={english} english={english} />
//       <BodyCellChange text={transcription} english={english} />
//       <BodyCellChange text={russian} english={english} />
//       {/* <Bodycell text={tags} /> */}
//       <td className="table__body-cell">
//         <SaveButton />
//       </td>
//     </tr>
//   );
// };
export { BodyRow };

// const BodyRow = ({ english, transcription, russian, tags, index }) => {
//     return (
//       <tr className="table__body-row">
//         <Bodycell text={index} english={english} />
//         <BodyCellChange text={english} english={english} />
//         <BodyCellChange text={transcription} english={english} />
//         <BodyCellChange text={russian} english={english} />
//         {/* <Bodycell text={tags} /> */}
//         <td className="table__body-cell">
//           <SaveButton />
//         </td>
//       </tr>
//     );
//   };
