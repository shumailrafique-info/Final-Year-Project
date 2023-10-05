import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
  {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? {}
      : {},
  },
  {
    ADD_TO_CART: (state, action) => {
      const item = action.payload;
      const isItemmExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemmExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemmExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    },
    REMOVE_CART_ITEM: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    },
    SAVE_SHIPPING_INFO: (state, action) => {
      return {
        ...state,
        shippingInfo: action.payload,
      };
    },
  }
);
