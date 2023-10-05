import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const Navigate = useNavigate();
  const cross = useRef();
  const handleClick = ()=>{
    cross.current.click()
  }
  
  return (
    <div       onClick={handleClick}
    >
      <div
        style={{
          zIndex: "10000000",
          backgroundColor: "rgba(0,0,0,.8)",
          width: "150px",
        }}
        className="offcanvas offcanvas-start text-white"
        data-bs-backdrop="static"
        tabIndex="-1"
        id="staticBackdrop"
        aria-labelledby="staticBackdropLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="staticBackdropLabel">
            {/* AuraBazaar */}
          </h5>
          <button
          ref={cross}
            type="button"
            style={{ backgroundColor: "white" }}
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body nav-links">
          <div
           data-bs-dismiss="offcanvas"
           aria-label="Close"
            onClick={() => {
              Navigate("/");
            }}
          >
            HOME
          </div>
          <div
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => {
              Navigate("/products");
            }}
          >
            PRODUCTS
          </div>
          <div
           data-bs-dismiss="offcanvas"
           aria-label="Close"
            onClick={() => {
              Navigate("/about");
            }}
          >
            ABOUT
          </div>
          <div
           data-bs-dismiss="offcanvas"
           aria-label="Close"
            onClick={() => {
              Navigate("/contact");
            }}
          >
            CONTACT
          </div>
          <div
           data-bs-dismiss="offcanvas"
           aria-label="Close"
            onClick={() => {
              Navigate("/login");
            }}
          >
            LOGIN
          </div>
          <div
           data-bs-dismiss="offcanvas"
           aria-label="Close"
            style={{ color: "orangered" }}
            onClick={() => {
              Navigate("/account");
            }}
          >
            ACCOUNT
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
