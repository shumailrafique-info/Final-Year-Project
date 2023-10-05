import React, { Fragment, useEffect, useState } from "react";
import "./myorders.scss";
import { useSelector, useDispatch } from "react-redux";
import { myOrders, clearErrors } from "../../redux/actions/orderAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { TableCell, TableRow, Typography } from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TablePagination,
} from "@material-ui/core";

const MyOrders = () => {
  const dispatch = useDispatch();

  const Alert = useAlert();

  const { user } = useSelector((state) => state.user);

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, Alert, error]);

  return (
    <div className="myOrders-Container">
      <h1
        style={{
          textAlign: "center",
          marginBottom: "1vmax",
          backgroundColor: "rgb(5, 135, 241)",
          borderRadius: "5px",
          padding: "1vmax",
        }}
      >
        {user.name}'s Orders
      </h1>

      {/* Orders for Mobile Phone */}
      {orders &&
        orders.map((order) => (
          <div
            key={order._id}
            className="SingleOrder"
            style={{
              border: "none",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <div>
              <h5>Order Id:-</h5>
              <Typography variant="h6" style={{ color: "rgba(0,0,0,.4)" }}>
                {order._id}
              </Typography>
            </div>
            <div>
              <Typography>
                Order Status : -{" "}
                <span
                  style={{
                    color: order.orderStatus == "Delivered" ? "green" : "red",
                  }}
                >
                  {order.orderStatus}
                </span>
              </Typography>
            </div>
            <div>
              <Typography>Order items :- {order.orderItems.length}</Typography>
            </div>
            <div>
              <Typography>
                Total Price :- Rs {Math.round(order.totalPrice)}
              </Typography>
            </div>

            <div className="SingleOrder-right">
              <Link to={`/order/${order._id}`}>
                Details :- <LaunchIcon />
              </Link>
            </div>
          </div>
        ))}

      <TableContainer className="MyOrdersTable" component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "rgb(5, 135, 241)" }}>
            <TableRow>
              <TableCell>Order Id#</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders &&
              orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell
                      style={{
                        color:
                          order.orderStatus === "Delivered" ? "green" : "red",
                      }}
                    >
                      {order.orderStatus}
                    </TableCell>
                    <TableCell>{order.orderItems.length}</TableCell>
                    <TableCell>
                      <Link to={`/order/${order._id}`}>
                        <LaunchIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography>Sort Items according to your taste</Typography>
          <TablePagination
            rowsPerPageOptions={[10, 15, 20, 25, 30]}
            count={orders && orders.length > 1 ? orders.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => {
              setPage(newPage);
            }}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(e.target.value);
            }}
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default MyOrders;
