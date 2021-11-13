import { menuItems } from "./menuItems";
import HeaderMenu from "./headerMenu";
import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="../assets/images/books.png" alt="books" className="logo" />
      </div>
      <nav className="header__nav">
        <ul className="header__list">
          {menuItems.map(menuItem => (
            <HeaderMenu
              text={menuItem.text}
              href={menuItem.href}
              key={menuItem.id}
            ></HeaderMenu>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
