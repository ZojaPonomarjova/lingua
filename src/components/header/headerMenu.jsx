// import { menuItems } from "./menuItems";

const HeaderMenu = props => {
  return (
    <li className="list__item">
      <a className="list__link" href={props.href}>
        {props.text}
      </a>
    </li>
  );
};

export default HeaderMenu;
