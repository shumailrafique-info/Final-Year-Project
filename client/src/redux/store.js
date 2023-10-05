import { configureStore } from "@reduxjs/toolkit";
import {
  productReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  deleteProductReducer,
  reviewsReducer,
  productReviewsReducer,
  homeProduct,
} from "./reducers/productReducer";
import {
  ProfileReducer,
  allUsersReducer,
  forgotPasswordReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  updateOrderReducer,
} from "./reducers/orderReducer";

const store = configureStore({
  reducer: {
    Products: productReducer,
    ProductDetails: productDetailsReducer,
    user: userReducer,
    profile: ProfileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: deleteProductReducer,
    allOrders: allOrdersReducer,
    order: updateOrderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewsReducer,
    category: homeProduct,
  },
});

export default store;
//use Selector
//use Dispatch
