import React, { Fragment } from "react";
import { RiMouseLine } from "react-icons/ri";
import Product from "./Product.jsx";
import Loading from "../Loading/Loading.jsx";
import "./Home.scss";
import MetaData from "../Metadata/MetaData.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../../redux/actions/productAction.js";
import { useEffect } from "react";
import Slider from "../Slider/Slider.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const { products, error, loading } = useSelector((state) => state.Products);

  const homepics = [
    {
      name: "Jewlery",
      image:
        "https://res.cloudinary.com/dmorfnqqk/image/upload/v1690237459/Jewlery_dhigvc.jpg",
      type: "JEWLERY",
    },
    {
      name: "Watches",
      image:
        "https://res.cloudinary.com/dmorfnqqk/image/upload/v1690237460/Men_Watches_r2opzh.jpg",
      type: "WATCHES",
    },
    {
      name: "Hats and Caps",
      image:
        "https://res.cloudinary.com/dmorfnqqk/image/upload/v1690237456/Hats_And_Caps_mcams2.jpg",
      type: "Hats and Caps",
    },

    {
      name: "Hand Bags",
      image:
        "https://res.cloudinary.com/dmorfnqqk/image/upload/v1690237455/Hand_Bags_lyxzb4.jpg",
      type: "Hand Bags",
    },
    {
      name: "Perfumes",
      image:
        "https://res.cloudinary.com/dmorfnqqk/image/upload/v1690237456/Perfumes_kecuja.jpg",
      type: "Perfumes",
    },
    {
      name: "Attire",
      image:
        "https://res.cloudinary.com/dmorfnqqk/image/upload/v1690237453/Attire_o4a0xo.jpg",
      type: "Attire",
    },
  ];

  useEffect(() => {
    if (error) {
      return Alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, error, Alert]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="AuraBazaar | Home" />

          <Slider />

          <h2 className="heading-home">Featured Products</h2>

          <div className="product-container" id="container">
            {homepics &&
              homepics.map((pro) => (
                <Link
                  onClick={() => dispatch({ type: `${pro.type}` })}
                  to={`/products?category=${pro.type}`}
                  key={pro.name}
                  className="productCart"
                >
                  <img src={pro.image} alt="" />
                  <p
                    style={{
                      textAlign: "center",
                      fontFamily: "'Russo One', sans-serif",
                    }}
                  >
                    {pro.name}
                  </p>
                </Link>
              ))}
          </div>
        
        </Fragment>
      )}
    </>
  );
};

export default Home;
