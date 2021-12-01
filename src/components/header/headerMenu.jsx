// import { menuItems } from "./menuItems";
import { Link } from "react-router-dom";

const MenuItem = props => {
  return (
    <li className="list__item">
      <Link className="list__link" to={props.href}>
        {props.text}
      </Link>
    </li>
  );
};

export default MenuItem;
