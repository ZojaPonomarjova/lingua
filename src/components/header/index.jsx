import MenuItem from "./headerMenu";
import "./header.scss";
import { Link } from "react-router-dom";
import MenuBurger from "./menuBurger";
import books from "../assets/images/books.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__logo" to="/">
          <img src={books} alt="books" className="logo" />
        </Link>
        <span className="header__name">lingua</span>
      </div>
      <nav className="header__nav">
        <ul className="header__list">
          <MenuItem text="Главная" href="/"></MenuItem>
          <MenuItem text="Мои слова" href="/my-words"></MenuItem>
          <MenuItem text="Добавить слово" href="/add-word"></MenuItem>
        </ul>
      </nav>
      <MenuBurger />
    </header>
  );
};

export default Header;
