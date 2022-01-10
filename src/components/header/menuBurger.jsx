import { Link } from "react-router-dom";

const MenuBurger = () => {
  return (
    <div className="header__alternative-menu">
      <nav>
        <div id="menuToggle">
          <input type="checkbox" />

          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <li className="list__item">
              <Link className="list__link" to="/">
                {"Главная"}
              </Link>
            </li>
            <li className="list__item">
              <Link className="list__link" to="/recommended-words">
                {"Рекомендованные слова"}
              </Link>
            </li>
            <li className="list__item">
              <Link className="list__link" to="/my-words">
                {"Мои слова"}
              </Link>
            </li>
            <li className="list__item">
              <Link className="list__link" to="/known-words">
                {"Изученные слова"}
              </Link>
            </li>
            <li className="list__item">
              <Link className="list__link" to="/add-word">
                {"Добавить слово"}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default MenuBurger;
