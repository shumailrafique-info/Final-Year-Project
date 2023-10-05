import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="ContactContainer">
      <h1 style={{fontWeight:"800",fontSize:"30px"}}>About Us</h1>
      <p style={{maxWidth:"800px",textAlign:"center",color:"#303030"}}>
      Welcome to <b style={{color:"black"}}>AuraBazaar</b> - Your eco-friendly e-commerce haven! We curate a vast collection of environmentally responsible products, empowering sustainable businesses and supporting conservation organizations with each purchase. Our user-friendly interface ensures a seamless shopping experience, while our blog section offers valuable insights and inspiration. Join us in building a sustainable future, one conscious choice at a time. <br></br>Happy shopping at <b style={{color:"black"}}>AuraBazaar!</b>
      </p>

      <Link to={"/"}>Go Home Page</Link>
    </div>
  );
};

export default About;
