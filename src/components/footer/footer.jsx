import "./footer.scss";
import FooterSocial from "./footerSocial";
import { icons } from "../data/iconsData";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <span className="footer__copyright">&#169; 2021</span>
        <span className="footer__text">Зоя Пономарева</span>
        <div className="footer__social">
          {icons.map(icon => (
            <FooterSocial
              alt={icon.alt}
              key={icon.alt}
              src={icon.src}
              href={icon.href}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
