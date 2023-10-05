import React, { Fragment } from "react";
import "./Header.scss";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../images/logo.png";
import { FaUserAlt } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { ImSearch } from "react-icons/im";
import { AiOutlineBars } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Fragment>
      <div className="container-fluid header">
        <div
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#staticBackdrop"
          aria-controls="staticBackdrop"
          className="menu"
        >
          <span>Menu</span>
          <AiOutlineBars />
        </div>
        <Link to={"/"} className="logo">
          <img src={logo} alt="logo" />
        </Link>
        <div className="icons">
          <Link to={"/search"}>
            <ImSearch />
          </Link>
          <Link to={"/cart"}>
            <FiShoppingBag />
          </Link>
          <Link
            target="_blank"
            to={"https://www.facebook.com/LibraQueen.15/"}
          >
            <BsFacebook />
          </Link>
          <Link
            target="_blank"
            to={"https://www.instagram.com/tamqeen_/"}
          >
            <BsInstagram />
          </Link>
        </div>
      </div>
    </Fragment>

  
  );
}

export default Header;
