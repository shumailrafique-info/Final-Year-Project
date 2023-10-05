import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productReducer = createReducer(initialState, {
  ALL_PRODUCT_REQUEST: (state, action) => {
    return {
      loading: true,
      products: [],
    };
  },
  ADMIN_PRODUCT_REQUEST: (state, action) => {
    return {
      loading: true,
      products: [],
    };
  },
  ALL_PRODUCT_SUCCESS: (state, action) => {
    return {
      loading: false,
      products: action.payload.products,
      productsCount: action.payload.productCount,
      resultPerPage: action.payload.resultPerPage,
      filteredProductsCount: action.payload.filteredProductsCount,
    };
  },
  ADMIN_PRODUCT_SUCCESS: (state, action) => {
    return {
      loading: false,
      products: action.payload.products,
      productCount: action.payload.productCount,
    };
  },
  ALL_PRODUCT__FAIL: (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  },
  ADMIN_PRODUCT__FAIL: (state, action) => {
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

export const productDetailsReducer = createReducer(
  { product: {} },
  {
    PRODUCT_DETAILS_REQUEST: (state, action) => {
      return {
        loading: true,
        ...state,
      };
    },
    PRODUCT_DETAILS_SUCCESS: (state, action) => {
      return {
        loading: false,
        product: action.payload,
      };
    },
    PRODUCT_DETAILS_FAIL: (state, action) => {
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

//Submit review to a Product
export const newReviewReducer = createReducer(
  {},
  {
    NEW_REVIEW_REQUEST: (state, action) => {
      return {
        loading: true,
        ...state,
      };
    },
    NEW_REVIEW_SUCCESS: (state, action) => {
      return {
        loading: false,
        success: action.payload,
      };
    },
    NEW_REVIEW_FAIL: (state, action) => {
      return {
        ...state,
        success: false,
      };
    },
    NEW_REVIEW_RESET: (state, action) => {
      return {
        // ...state,
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
//Add a New Product Admin
export const newProductReducer = createReducer(
  {},
  {
    NEW_PRODUCT_REQUEST: (state, action) => {
      return {
        loading: true,
      };
    },
    NEW_PRODUCT_SUCCESS: (state, action) => {
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    },
    NEW_PRODUCT_FAIL: (state, action) => {
      return {
        loading: false,
        message: action.payload,
      };
    },
    NEW_PRODUCT_RESET: (state, action) => {
      return {
        // ...state,
        loading: false,
        error: null,
      };
    },
    CLEAR_ERRORS: (state, action) => {
      return {
        ...state,
        error: null,
        message: null,
      };
    },
  }
);
export const deleteProductReducer = createReducer(
  {},
  {
    DELETE_PRODUCT_REQUEST: (state, action) => {
      return {
        loading: true,
      };
    },
    UPDATE_PRODUCT_REQUEST: (state, action) => {
      return {
        loading: true,
      };
    },
    DELETE_PRODUCT_SUCCESS: (state, action) => {
      return {
        loading: false,
        isDeleted: action.payload,
      };
    },
    UPDATE_PRODUCT_SUCCESS: (state, action) => {
      return {
        loading: false,
        isUpdated: action.payload,
      };
    },
    DELETE_PRODUCT_FAIL: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_PRODUCT_FAIL: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    DELETE_PRODUCT_RESET: (state, action) => {
      return {
        ...state,
        isDeleted: false,
      };
    },
    UPDATE_PRODUCT_RESET: (state, action) => {
      return {
        ...state,
        isUpdated: false,
      };
    },
    CLEAR_ERRORS: (state, action) => {
      return {
        ...state,
        error: null,
        message: null,
      };
    },
  }
);

// All Reviews Reducer

export const productReviewsReducer = createReducer(
  { reviews: [] },
  {
    ALL_REVIEW_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    ALL_REVIEW_SUCCESS: (state, action) => {
      return {
        loading: false,
        reviews: action.payload,
      };
    },
    ALL_REVIEW_FAIL: (state, action) => {
      return {
        ...state,
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

//Review review to a Product
export const reviewsReducer = createReducer(
  {},
  {
    DELETE_REVIEW_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_REVIEW_SUCCESS: (state, action) => {
      return {
        loading: false,
        isDeleted: action.payload,
      };
    },
    DELETE_REVIEW_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_REVIEW_RESET: (state, action) => {
      return {
        ...state,
        isDeleted: false,
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


export const homeProduct = createReducer(
  { category: "" },
  {
    JEWELRY: (state, action) => {
      return {
        category: "Jewelry",
      };
    },
    HatsAndCaps: (state, action) => {
      return {
        category: "Hats and Caps",
      };
    },
    WATCHES: (state, action) => {
      return {
        category: "Watches",
      };
    },
    HandBags: (state, action) => {
      return {
        category: "Hand Bags",
      };
    },
    Perfumes: (state, action) => {
      return {
        category: "Perfumes",
      };
    },
    FootWears: (state, action) => {
      return {
        category: "Foot Wears",
      };
    },
    Top: (state, action) => {
      return {
        category: "Top",
      };
    },
    Bottoms: (state, action) => {
      return {
        category: "Bottoms",
      };
    },
    Attire: (state, action) => {
      return {
        category: "Attire",
      };
    },
  }
);

// export default productReducer;
