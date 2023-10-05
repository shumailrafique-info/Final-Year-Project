import React, { useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import "./dashboard.scss";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../redux/actions/productAction.js";
import { getAdminOrders } from "../../redux/actions/orderAction.js";
import { getAllUsers } from "../../redux/actions/userAction.js";
// import { CategoryScale, Chart } from "chart.js";
// import {
//   Chart,
//   LineController,
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   CategoryScale,
// } from "chart.js";

// Chart.register(
//   LineController,
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   CategoryScale
// );
const Dashboard = () => {
  let outOfStock = 0;
  const Dispatch = useDispatch();

  const { products, productCount } = useSelector((state) => state.Products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    Dispatch(getAdminProducts());
    Dispatch(getAdminOrders());
    Dispatch(getAllUsers());
  }, [Dispatch]);

  let totalAmount = 0;

  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
  const lineState = {
    labels: ["Initial Amount ", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const DoughnutState = {
    labels: ["Out Of Stock", "InStock"],
    datasets: [
      {
        // label: "TOTAL AMOUNT",
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <div className="dashboard">
      
      <div>
        <Sidebar />
      </div>
      <div className="dashboardContainer">
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount Of Current Orders
              <br /> Rs {Math.round(totalAmount)}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to={"/admin/products"}>
              <p>Product</p>
              <p>{productCount && productCount}</p>
            </Link>
            <Link to={"/admin/orders"}>
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to={"/admin/users"}>
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={DoughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
