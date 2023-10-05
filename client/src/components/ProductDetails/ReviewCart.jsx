import React from "react";
import profilepng from "../../images/Profile.png";
import { Rating } from "@material-ui/lab";

const ReviewCart = ({ review }) => {
  return (
    <div className="reviewCard">
      <img src={profilepng} alt="User" />
      <p>{review.name}</p>
      <Rating
        {...{
          value: review.rating,
          readOnly: true,
          precision: 0.5,
        }}
      />
      <span className="reviewCartComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCart;
