import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const Product = ({ product }) => {
  return (
    <Link
      key={product._id}
      className="productCart"
      to={`/product/${product._id}`}
    >
      <img src={product.images[0].url} alt="" />
      <p>{product.name}</p>
      <div>
        <Rating
          {...{
            value: product.ratings,
            readOnly: true,
            precision: 0.5,
          }}
        />{" "}
        <span className="productCardSpan">
          ({product.reviews.length} Reviews)
        </span>
      </div>
      <span>{`Rs ${product.price}`}</span>
    </Link>
  );
};

export default Product;
