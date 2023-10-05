import React, { Fragment, useEffect, useState } from "react";
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../redux/actions/productAction.js";
import { useAlert } from "react-alert";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import MetaData from "../Metadata/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const ProductReviews = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      Navigate("/admin/reviews");
      dispatch({ type: "DELETE_REVIEW_RESET" });
    }
  }, [dispatch, alert, error, deleteError, Navigate, isDeleted, productId]);

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <Table>
              <TableHead style={{ backgroundColor: "rgb(5, 135, 241)" }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Comment</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews &&
                  reviews.map((review) => (
                    <TableRow key={review._id} className="TableBodyHover">
                      <TableCell>{review.name}</TableCell>

                      <TableCell>{review.rating}</TableCell>

                      <TableCell>{review.comment}</TableCell>
                      <TableCell style={{ minWidth: "120px" }}>
                        <Button
                          onClick={() => deleteReviewHandler(review._id)}
                          style={{ color: "red" }}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
