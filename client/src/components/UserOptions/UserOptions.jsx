import React, { Fragment, useState } from "react";
import "./UserOption.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAPPIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../redux/actions/userAction";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const orders = () => {
    Navigate("/orders");
  };
  const account = () => {
    Navigate("/account");
  };
  const logoutUser = () => {
    dispatch(logout());
    alert.success("Logout Successfully");
    Navigate("/login");
  };
  const dashboard = () => {
    Navigate("/admin/dashboard");
  };
  const cart = () => {
    Navigate("/cart");
  };

  const options = [
    {
      icon: <ExitToAPPIcon />,
      name: "Logout",
      func: logoutUser,
    },
    {
      icon: <ListAltIcon />,
      name: "Orders",
      func: orders,
    },
    {
      icon: <PersonIcon />,
      name: "Profile",
      func: account,
    },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
  ];

  if (user.role === "admin") {
    options.push({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SppedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: "11" }}
        direction="up"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
