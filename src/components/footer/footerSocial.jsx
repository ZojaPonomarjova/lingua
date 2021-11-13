import "./footer.scss";

const FooterSocial = props => {
  return (
    <div className="footer__icon-container">
      <a href={props.href} className="footer__link">
        <img src={props.src} alt={props.alt} className="footer__icon" />
        <div className="icon1"></div>
      </a>
    </div>
  );
};

export default FooterSocial;
