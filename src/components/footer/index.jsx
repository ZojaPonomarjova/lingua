import "./footer.scss";
import FooterSocial from "./footerSocial";
import linkedIn from "../../assets/images/icons8-linkedin.svg";
import github from "../../assets/images/icons8-github.svg";
import telegram from "../../assets/images/icons8-telegram-app.svg";
import instagram from "../../assets/images/icons8-instagram.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <span className="footer__copyright">&#169; 2021</span>
        <span className="footer__text">Зоя Пономарева</span>
        <div className="footer__social">
          <FooterSocial
            alt="linkedIn"
            src={linkedIn}
            href="https://www.linkedin.com/in/zoia-ponomareva-56aa36220/"
          />
          <FooterSocial
            alt="github"
            src={github}
            href="https://github.com/ZojaPonomarjova/"
          />
          <FooterSocial
            alt="telegram"
            src={telegram}
            href="https://t.me/Zoia_Ponomareva"
          />
          <FooterSocial
            alt="instagram"
            src={instagram}
            href="https://www.instagram.com/zoja.ponomareva/"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
