import React, { useState } from "react";
import "./App.css";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/Header/Header.jsx";
import Home from "./components/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Products from "./components/Products/Products.jsx";
import Search from "./components/Search/Search.jsx";
import LoginSignup from "./components/Login/LoginSignup.jsx";
import Profile from "./components/Profile/Profile.jsx";
import store from "./redux/store.js";
import { loadUser } from "./redux/actions/userAction.js";
import UserOptions from "./components/UserOptions/UserOptions.jsx";
import { useSelector } from "react-redux";
import UpdateProfile from "./components/User/UpdateProfile.jsx";
import UpdatePassword from "./components/User/UpdatePassword.jsx";
import PasswordForgot from "./components/User/PasswordForgot.jsx";
import ResetPassword from "./components/User/ResetPassword.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Shipping from "./components/Cart/Shipping.jsx";
import ConfirmOrder from "./components/Cart/ConfirmOrder.jsx";
import Payment from "./components/Cart/Payment.jsx";
import OrderSuccess from "./components/Cart/OrderSuccess.jsx";
import MyOrders from "./components/Order/MyOrders.jsx";
import OrderDetails from "./components/Order/OrderDetails.jsx";
import Dashboard from "./components/admin/Dashboard.jsx";
import ProductList from "./components/admin/ProductList.jsx";
import UpdateProduct from "./components/admin/UpdateProduct.jsx";
import OrderList from "./components/admin/OrderList.jsx";
import ProcessOrder from "./components/admin/ProcessOrder.jsx";
import UsersList from "./components/admin/UsersList.jsx";
import ProductReviews from "./components/admin/ProductReviews.jsx";
import UpdateUser from "./components/admin/UpdateUser.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Contact from "./components/Contact/Contact.jsx";
import About from "./components/About/About.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";

import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import NewProduct from "./components/admin/NewProduct";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.StripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka", "Lucida Sans"],
      },
    });
    store.dispatch(loadUser());
    getStripeApikey();
  }, []);

  // window.addEventListener("contextmenu",(e)=>e.preventDefault())

  return (
    <Router>
      <Header />
      <Sidebar />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignup />} />

        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />

        {isAuthenticated && (
          <Route exact path="/me/update" element={<UpdateProfile />} />
        )}

        {isAuthenticated && (
          <Route exact path="/password/update" element={<UpdatePassword />} />
        )}

        <Route exact path="/account" element={<Profile />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />

        <Route exact path="/password/forgot" element={<PasswordForgot />} />

        <Route exact path="/cart" element={<Cart />} />

        {isAuthenticated && (
          <Route exact path="/shipping" element={<Shipping />} />
        )}

        {isAuthenticated && (
          <Route exact path="/confirm/order" element={<ConfirmOrder />} />
        )}

        {isAuthenticated && (
          <Route
            exact
            path="/process/payment"
            element={
              stripeApiKey !== "" && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              )
            }
          />
        )}

        {isAuthenticated && (
          <Route exact path="/success" element={<OrderSuccess />} />
        )}

        {isAuthenticated && (
          <Route exact path="/orders" element={<MyOrders />} />
        )}

        {isAuthenticated && (
          <Route exact path="/order/:id" element={<OrderDetails />} />
        )}

        {isAuthenticated && user && user.role === "admin" ? (
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
        ) : (
          ""
        )}
        {isAuthenticated && user && user.role === "admin" ? (
          <Route exact path="/admin/products" element={<ProductList />} />
        ) : (
          ""
        )}
        {isAuthenticated && user && user.role === "admin" ? (
          <Route exact path="/admin/product" element={<NewProduct />} />
        ) : (
          ""
        )}
        {isAuthenticated && user && user.role === "admin" ? (
          <Route exact path="/admin/product/:id" element={<UpdateProduct />} />
        ) : (
          ""
        )}
        {isAuthenticated && user && user.role === "admin" ? (
          <Route exact path="/admin/orders" element={<OrderList />} />
        ) : (
          ""
        )}
        {isAuthenticated && user && user.role === "admin" ? (
          <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
        ) : (
          ""
        )}
        {isAuthenticated && user && user.role === "admin" ? (
          <Route exact path="/admin/users" element={<UsersList />} />
        ) : (
          ""
        )}
        {isAuthenticated && user && user.role === "admin" ? (
          <Route exact path="/admin/user/:id" element={<UpdateUser />} />
        ) : (
          ""
        )}
        {isAuthenticated && user && user.role === "admin" ? (
          <Route exact path="/admin/reviews" element={<ProductReviews />} />
        ) : (
          ""
        )}

        <Route exact path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
