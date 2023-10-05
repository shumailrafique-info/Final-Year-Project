import React from "react";
import "./Contact.scss";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="ContactContainer">
      <h1 style={{ fontWeight: "800", fontSize: "30px" }}>Contact</h1>
      <p style={{ maxWidth: "800px", textAlign: "center", color: "#303030" }}>
        To cancel an order, please contact us with your order number, full name,
        email address, phone number, and the reason for cancellation. Our
        customer support team will process your request promptly. We value your
        satisfaction and appreciate your feedback to improve our services.
        <br></br>Thank you for choosing us, and we hope to serve you again in
        the future.
        <br></br>
        <b style={{ color: "black" }}>AuraBazaar</b>
        <br></br>
        Customer Support Team
      </p>
      <p style={{ color: "#303030" }}> <b style={{color:"black"}}>Email</b> : tamqeen23@gmail.com</p>
      <Link to={"/"}>Go Home Page</Link>
    </div>
  );
};

export default Contact;
