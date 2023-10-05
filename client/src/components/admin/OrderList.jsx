import React, { useEffect, Fragment } from "react";
import {
  clearErrors,
  getAdminOrders,
  deleteOrder,
} from "../../redux/actions/orderAction";
import "./ProductList.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, TableRow } from "@material-ui/core";
import MetaData from "../Metadata/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { Table, TableHead, TableBody, TableCell } from "@material-ui/core";

const OrderList = () => {
  const Dispatch = useDispatch();
  const Alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      Alert.error(error);
      Dispatch(clearErrors());
    }
    if (deleteError) {
      Alert.error(deleteError);
      Dispatch(clearErrors());
    }
    if (isDeleted) {
      Alert.success("Order Deleted");
      Dispatch({
        type: "DELETE_ORDER_RESET",
      });
    }
    Dispatch(getAdminOrders());
  }, [error, Dispatch, Alert, deleteError, isDeleted]);

  const delteOrderHandler = (id) => {
    Dispatch(deleteOrder(id));
  };

  return (
    <Fragment>
      <MetaData title={"ALL ORDERS - ADMiN"} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">All Orders</h1>
          <Table>
            <TableHead style={{ backgroundColor: "rgb(5, 135, 241)" }}>
              <TableRow>
                {window.innerWidth > 600 ? <TableCell>id</TableCell> : ""}
                <TableCell>Status</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((order) => (
                  <TableRow key={order._id} className="TableBodyHover">
                    {window.innerWidth > 600 ? (
                      <TableCell>{order._id}</TableCell>
                    ) : (
                      ""
                    )}

                    <TableCell
                      style={{
                        color:
                          order.orderStatus === "Delivered" ? "green" : "red",
                      }}
                    >
                      {order.orderStatus}
                    </TableCell>

                    <TableCell>{order.orderItems.length}</TableCell>

                    <TableCell>{order.totalPrice}</TableCell>
                    <TableCell style={{ minWidth: "120px" }}>
                      <Link
                        style={{ color: "green" }}
                        to={`/admin/order/${order._id}`}
                      >
                        <EditIcon />
                      </Link>

                      <Button
                        onClick={() => delteOrderHandler(order._id)}
                        style={{ color: "red" }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
