import React from "react";
import "./CartitemCart.scss";
import { Link } from "react-router-dom";

const CarItemCart = ({ item, deleteCartItems }) => {
  return (
    <div className="cartItemCart">
      <img src={item.image} alt="Product Img" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: Rs ${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>remove</p>
      </div>
    </div>
  );
};

export default CarItemCart;
