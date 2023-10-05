import axios from "axios";

//Login Action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.response.data.message });
    console.log(error);
  }
};

//Register Action
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_USER_REQUEST" });

    const { data } = await axios.post("/api/v1/register", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch({ type: "REGISTER_USER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "REGISTER_USER_FAIL",
      payload: error.response.data.message,
    });
    console.log(error);
  }
};

//LoadUser Action
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_USER_REQUEST" });

    const { data } = await axios.get("/api/v1/me");

    dispatch({ type: "LOAD_USER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "LOAD_USER_FAIL",
      payload: error.response.data.message,
    });
  }
};

//LogOut User
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");

    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "LOGOUT_FAIL",
      payload: error.response.data.message,
    });
    console.log(error);
  }
};

//Update Action
export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PROFILE_REQUEST" });

    const { data } = await axios.put("/api/v1/me/update", userData);

    dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_PROFILE_FAIL",
      payload: error.response.data.message,
    });
    console.log(error);
  }
};

//Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PASSWORD_REQUEST" });

    const { data } = await axios.put("/api/v1/password/update", passwords, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({ type: "UPDATE_PASSWORD_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_PASSWORD_FAIL",
      payload: error.response.data.message,
    });
    // console.log(error);
  }
};

//Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "FROGOT_PASSWORD_REQUEST" });

    const { data } = await axios.post("/api/v1/password/forgot", email, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({ type: "FROGOT_PASSWORD_SUCCESS", payload: data.message });
  } catch (error) {
    dispatch({
      type: "FROGOT_PASSWORD_FAIL",
      payload: error.response.data.message,
    });
    console.log(error);
  }
};

//Forgot Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    // console.log(token);
    console.log(passwords);
    dispatch({ type: "RESET_PASSWORD_REQUEST" });

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "RESET_PASSWORD_FAIL",
      payload: error.response.data.message,
    });
    console.log(error);
  }
};

//Get All Users Admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "ALL_USERS_REQUEST" });
    const { data } = await axios.get("/api/v1/admin/users");

    dispatch({ type: "ALL_USERS_SUCCESS", payload: data.users });
  } catch (error) {
    dispatch({
      type: "ALL_USERS_FAIL",
      payload: error.response.data.message,
    });
    console.log(error);
  }
};

//Get All Users Admin
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "USER_DETAILS_REQUEST" });
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({ type: "USER_DETAILS_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({
      type: "USER_DETAILS_FAIL",
      payload: error.response.data.message,
    });
    console.log(error);
  }
};

//Update  User ROlE
export const updateUserRole = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_USER_REQUEST" });

    const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({ type: "UPDATE_USER_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_FAIL",
      payload: error.response.data.message,
    });
    // console.log(error);
  }
};

//Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_USER_REQUEST" });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({ type: "DELETE_USER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "DELETE_USER_FAIL",
      payload: error.response.data.message,
    });
    // console.log(error);
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
