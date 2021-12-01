import MenuItem from "./headerMenu";
import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="../assets/images/books.png" alt="books" className="logo" />
      </div>
      <nav className="header__nav">
        <ul className="header__list">
          <MenuItem text="Главная" href="/"></MenuItem>
          <MenuItem text="Мои слова" href="/my-words"></MenuItem>
          <MenuItem text="Добавить слово" href="/add-word"></MenuItem>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
