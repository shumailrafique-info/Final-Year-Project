import axios from "axios";

//For Getting All Products
export const getProducts =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 25000],
    category = "",
    rating = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: "ALL_PRODUCT_REQUEST" });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`;
      }
      const { data } = await axios.get(link);

      dispatch({
        type: "ALL_PRODUCT_SUCCESS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "ALL_PRODUCT__FAIL",
        payload: error.response.data.message,
      });
    }
  };
///ProductDetails action
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });

    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: "PRODUCT_DETAILS_SUCCESS",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DETAILS_FAIL",
      payload: error.response.data.message,
    });
  }
};
//Get Products Admin

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_PRODUCT_REQUEST" });

    const { data } = await axios.get(`/api/v1/admin/products`);
    dispatch({
      type: "ADMIN_PRODUCT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ADMIN_PRODUCT_FAIL",
      payload: error.response.data.message,
    });
  }
};

///New Review action
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_REVIEW_REQUEST" });
    const { data } = await axios.put(`/api/v1/review`, reviewData, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch({
      type: "NEW_REVIEW_SUCCESS",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "NEW_REVIEW_FAIL",
      payload: error.response.data.message,
    });
  }
};

///New Product action
export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_PRODUCT_REQUEST" });

    const { data } = await axios.post(
      `/api/v1/admin/products/new`,
      productData
    );
    dispatch({
      type: "NEW_PRODUCT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "NEW_PRODUCT_FAIL",
      payload: error.response.data.message,
    });
    // console.log(error);
  }
};
///Update Product action
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PRODUCT_REQUEST" });

    const { data } = await axios.put(
      `/api/v1/admin/products/${id}`,
      productData
    );
    dispatch({
      type: "UPDATE_PRODUCT_SUCCESS",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_PRODUCT_FAIL",
      payload: error.response.data.message,
    });
    // console.log(error);
  }
};

///DeleteProduct Action Product action
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_PRODUCT_REQUEST" });

    const { data } = await axios.delete(`/api/v1/admin/products/${id}`);
    dispatch({
      type: "DELETE_PRODUCT_SUCCESS",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_PRODUCT_FAIL",
      payload: error.response.data.message,
    });
    // console.log(error);
  }
};

//For clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: "CLEAR_ERRORS",
  });
};

///Get all rwviews action
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ALL_REVIEW_REQUEST" });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
    dispatch({
      type: "ALL_REVIEW_SUCCESS",
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: "ALL_REVIEW_FAIL",
      payload: error.response.data.message,
    });
  }
};

///Delete rwviews action
export const deleteReviews = (id, productid) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_REVIEW_REQUEST" });

    const { data } = await axios.delete(
      `/api/v1/reviews?productId=${productid}&id=${id}`
    );
    dispatch({
      type: "DELETE_REVIEW_SUCCESS",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_REVIEW_FAIL",
      payload: error.response.data.message,
    });
  }
};
