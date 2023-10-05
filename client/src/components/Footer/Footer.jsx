import React from "react";
import playStore from "../../images/playstore.png";
import appStore from "../../images/Appstore.png";
import "./Footer.scss"

const Footer = () => {
  return (
    <footer id="footer" className="container-fluid">
      <div className="leftFooter">
        <h4>SIGN UP TO OUR WEBSITE</h4>
        <button >SIGN UP</button>
        <hr style={{color:"white",height:"2px",width:"100%"}} />
        <h4>DOWNLOAD OUR APP FROM</h4>
        <img src={playStore} alt="" />
        <img src={appStore} alt="" />
      </div>
      <div className="midFooter">
        <h1>AuraBazaar</h1>
        <p> Developed by Tamkeen</p>
      </div>
      <div className="rigthFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/tamqeen_/" target="_blank">Instagram</a>
        <a href="Youtube.com" target="_blank">Youtube</a>
        <a href="https://www.facebook.com/LibraQueen.15/" target="_blank" >Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
