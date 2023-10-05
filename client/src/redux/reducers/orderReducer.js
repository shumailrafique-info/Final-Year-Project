import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const newOrderReducer = createReducer(initialState, {
  CREATE_ORDER_REQUEST: (state, action) => {
    return {
      ...state,
      loading: true,
    };
  },
  CREATE_ORDER_SUCCESS: (state, action) => {
    return {
      loading: false,
      order: action.payload,
    };
  },
  CREATE_ORDER_FAIL: (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  },
  CLEAR_ERRORS: (state, action) => {
    return {
      ...state,
      error: null,
    };
  },
});

export const myOrdersReducer = createReducer(
  { orders: [] },
  {
    MY_ORDERS_REQUEST: (state, action) => {
      return {
        // ...state,
        loading: true,
      };
    },
    MY_ORDERS_SUCCESS: (state, action) => {
      return {
        loading: false,
        orders: action.payload,
      };
    },
    MY_ORDERS_FAIL: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    CLEAR_ERRORS: (state, action) => {
      return {
        ...state,
        error: null,
      };
    },
  }
);

//AllOrders for Admin
export const allOrdersReducer = createReducer(
  { orders: [] },
  {
    ALL_ORDERS_REQUEST: (state, action) => {
      return {
        // ...state,
        loading: true,
      };
    },
    ALL_ORDERS_SUCCESS: (state, action) => {
      return {
        loading: false,
        orders: action.payload,
      };
    },
    ALL_ORDERS_FAIL: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    CLEAR_ERRORS: (state, action) => {
      return {
        ...state,
        error: null,
      };
    },
  }
);
//
export const updateOrderReducer = createReducer(
  { },
  {
    UPDATE_ORDER_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_ORDER_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_ORDER_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    DELETE_ORDER_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    },
    UPDATE_ORDER_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_ORDER_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_ORDER_RESET: (state, action) => {
      return {
        loading: false,
        isDeleted: false,
      };
    },
    UPDATE_ORDER_RESET: (state, action) => {
      return {
        loading: false,
        isUpdated: false,
      };
    },
    CLEAR_ERRORS: (state, action) => {
      return {
        ...state,
        error: null,
      };
    },
  }
);

//Order Details Reducer
export const orderDetailsReducer = createReducer(
  { order: {} },
  {
    ORDER_DETAILS_REQUEST: (state, action) => {
      return {
        // ...state,
        loading: true,
      };
    },
    ORDER_DETAILS_SUCCESS: (state, action) => {
      return {
        loading: false,
        order: action.payload,
      };
    },
    ORDER_DETAILS_FAIL: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    CLEAR_ERRORS: (state, action) => {
      return {
        ...state,
        error: null,
      };
    },
  }
);
