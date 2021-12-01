import "./pageNotFound.scss";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page_404">
      <h2 className="text-center ">404</h2>
      <div className="four_zero_four_bg"></div>

      <div className="contant_box_404">
        <h3 className="h2">Упс! Мы не можем найти нужную вам страницу.</h3>

        <p>Возможно, она была перемещена, удалена или переименована.</p>

        <Link to="/" className="link_404">
          На главную
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
