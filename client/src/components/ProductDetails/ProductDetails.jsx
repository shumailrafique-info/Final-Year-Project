import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.scss";
import ReviewCart from "./ReviewCart.jsx";
import { useSelector, useDispatch } from "react-redux";
import { WhatsappShareButton, WhatsappIcon, FacebookIcon, FacebookShareButton } from "react-share"
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../redux/actions/productAction.js";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";
import { useAlert } from "react-alert";
import MetaData from "../Metadata/MetaData.jsx";
import { addItemsToCart } from "../../redux/actions/cartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const ProductDetails = ({ match }) => {
  const Alert = useAlert();

  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.ProductDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const submitReviewToggel = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const submitReviewHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    for (const value of myForm.values()) {
      console.log(value);
    }
    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      Alert.error(reviewError, reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      Alert.success("Review Submitted");
      dispatch({ type: "NEW_REVIEW_RESET" });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, Alert, error, success, reviewError]);

  let [quantity, setquantity] = useState(1);

  const [open, setOpen] = useState(false);

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const incquantity = () => {
    if (product.Stock <= quantity) {
      return;
    }
    setquantity(quantity + 1);
  };
  const decquantity = () => {
    setquantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    Alert.success("Item Added To Cart");
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- AuraBazaar`} />

          <div className="ProductDetails">
            <div className="Carousal-div">
              <div style={{ width: "25vmax" }}>
                <Carousel>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="CarousalImage img-fluid"
                        key={i}
                        src={item.url}
                        alt={i + "Slide"}
                      />
                    ))}
                </Carousel>
              </div>
            </div>
            <div className="Content-div">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>{`Product #${product._id}`}</p>
              </div>
              <div className="detailsBlock-2">
                {product ? (
                  <Rating
                    {...{
                      value: product.ratings,
                      size: "large",
                      readOnly: true,
                      precision: 0.5,
                    }}
                  />
                ) : (
                  "Loading"
                )}
                <span className="detailsBlock-2-span">
                  ( {product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`Rs ${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    {quantity === 1 ? (
                      ""
                    ) : (
                      <button onClick={decquantity}>-</button>
                    )}
                    <input
                      type="Number"
                      readOnly
                      name="QuantityInput"
                      value={quantity}
                      onChange={(e) => { }}
                    />
                    <button onClick={incquantity}>+</button>
                  </div>
                  <button
                    disabled={product && product.Stock === 0 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <div style={{ display: "flex", gap: "5px" }}>
                <WhatsappShareButton url={`https://aurabazaar.vercel.app/product/${id}`}>
                  <WhatsappIcon size={40} round></WhatsappIcon>
                </WhatsappShareButton>
                <FacebookShareButton url={`https://aurabazaar.vercel.app/product/${id}`}>
                  <FacebookIcon size={40} round></FacebookIcon>
                </FacebookShareButton>
              </div>
              <button onClick={submitReviewToggel} className="submitReview">
                Submit Review
              </button>

            </div>
          </div>

          <h3 className="heading-rev">Reviews</h3>

          {/* Submit Review */}
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggel}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                size={"large"}
                name="RatingComp"
              />
              <textarea
                className="submitDialogTextArea"
                name="TextAre"
                cols={"30"}
                rows={"5"}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggel} color="secondary">
                Cancel
              </Button>
              <Button onClick={submitReviewHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((rev) => (
                <ReviewCart key={rev._id} review={rev} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
