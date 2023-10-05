import axios from "axios";

///Create Orders
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_ORDER_REQUEST" });

    const { data } = await axios.post(`/api/v1/order/new`, order, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({ type: "CREATE_ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "CREATE_ORDER_FAIL",
      payload: error.response.data.message,
    });
    // console.log("Error ");
  }
};

///My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "MY_ORDERS_REQUEST" });

    const { data } = await axios.get(`/api/v1/orders/me`);
    // console.log(data);
    dispatch({ type: "MY_ORDERS_SUCCESS", payload: data.orders });
  } catch (error) {
    dispatch({
      type: "MY_ORDERS_FAIL",
      payload: error.response.data.message,
    });
    // console.log("Error ");
  }
};
///ADMIN Orders All
export const getAdminOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "ALL_ORDERS_REQUEST" });

    const { data } = await axios.get(`/api/v1/admin/orders`);
    // console.log(data);
    dispatch({ type: "ALL_ORDERS_SUCCESS", payload: data.orders });
  } catch (error) {
    dispatch({
      type: "ALL_ORDERS_FAIL",
      payload: error.response.data.message,
    });
    // console.log("Error ");
  }
};

///Update Orders
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_ORDER_REQUEST" });

    const { data } = await axios.put(`/api/v1/admin/order/${id}`, order, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({ type: "UPDATE_ORDER_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_ORDER_FAIL",
      payload: error.response.data.message,
    });
    // console.log("Error ");
  }
};

///delete Orders
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_ORDER_REQUEST" });

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    dispatch({ type: "DELETE_ORDER_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "DELETE_ORDER_FAIL",
      payload: error.response.data.message,
    });
    // console.log("Error ");
  }
};

///My Order Details
export const orderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ORDER_DETAILS_REQUEST" });

    const { data } = await axios.get(`/api/v1/order/${id}`);
    // console.log(data);
    dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data.order });
  } catch (error) {
    dispatch({
      type: "ORDER_DETAILS_FAIL",
      payload: error.response.data.message,
    });
    // console.log("Error ");
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
