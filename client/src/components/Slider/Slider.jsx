import React from "react";
import "./Slider.css";

const Slider = () => {
  return (
    <>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        style={{ zIndex: 1 }}
        data-bs-ride="true"
        data-bs-interval="5000"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
          <img
              src="https://cdn.pixabay.com/photo/2016/11/22/21/57/apparel-1850804_640.jpg"
              className="d-block w-100 slider_img"
              alt="..."
            />
           
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn.pixabay.com/photo/2016/01/27/22/10/shopping-1165437_640.jpg"
              className="d-block w-100 slider_img"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1494&q=80"
              className="d-block w-100 slider_img"
              alt="..."
            />
          </div>
          <div className="carousel-item">
          <img
              src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              className="d-block w-100 slider_img"
              alt="..."
            />

          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      
    </>
  );
};

export default Slider;
