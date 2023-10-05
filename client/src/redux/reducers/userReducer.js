import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  { user: {} },
  {
    LOGIN_REQUEST: (state, action) => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    },
    REGISTER_USER_REQUEST: (state, action) => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    },
    LOAD_USER_REQUEST: (state, action) => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    },
    LOGIN_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    REGISTER_USER_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    LOAD_USER_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    LOGOUT_SUCCESS: (state, action) => {
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    },
    LOGIN_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    },
    REGISTER_USER_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    },
    LOAD_USER_FAIL: (state, action) => {
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    },
    LOGOUT_FAIL: (state, action) => {
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

///Update User
export const ProfileReducer = createReducer(
  {},
  {
    UPDATE_PROFILE_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_PASSWORD_REQUEST: (state, action) => {
      return {
        loading: true,
      };
    },
    UPDATE_USER_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_USER_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_PROFILE_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    UPDATE_PASSWORD_SUCCESS: (state, action) => {
      return {
        loading: false,
        isUpdated: true,
      };
    },
    UPDATE_USER_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    DELETE_USER_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message:action.payload.message
      };
    },
    UPDATE_PROFILE_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_PASSWORD_FAIL: (state, action) => {
      return {
        // ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_USER_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_USER_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_PROFILE_RESET: (state, action) => {
      return {
        ...state,
        isUpdated: false,
      };
    },
    UPDATE_PASSWORD_RESET: (state, action) => {
      return {
        ...state,
        isUpdated: false,
      };
    },
    UPDATE_USER_RESET: (state, action) => {
      return {
        ...state,
        isUpdated: false,
      };
    },
    DELETE_USER_RESET: (state, action) => {
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

///reset password/Forgot Password User
export const forgotPasswordReducer = createReducer(
  {},
  {
    FROGOT_PASSWORD_REQUEST: (state, action) => {
      return {
        // ...state,
        loading: true,
        error: null,
      };
    },
    RESET_PASSWORD_REQUEST: (state, action) => {
      return {
        // ...state,
        loading: true,
        error: null,
      };
    },
    FROGOT_PASSWORD_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    },
    RESET_PASSWORD_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    },

    FROGOT_PASSWORD_FAIL: (state, action) => {
      return {
        // ...state,
        loading: false,
        error: action.payload,
      };
    },
    RESET_PASSWORD_FAIL: (state, action) => {
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

//Get All Users Admin
export const allUsersReducer = createReducer(
  { users: [] },
  {
    ALL_USERS_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    ALL_USERS_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    },
    ALL_USERS_FAIL: (state, action) => {
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

export const userDetailsReducer = createReducer(
  { user: {} },
  {
    USER_DETAILS_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    USER_DETAILS_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    },
    USER_DETAILS_FAIL: (state, action) => {
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
