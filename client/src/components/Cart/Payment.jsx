import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Metadata/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.scss";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../redux/actions/orderAction";

const Payment = () => {
  const Navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const Alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    // paymentInfo:,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        { headers: { "Content-Type": "application/json" } }
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements || !client_secret) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        Alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          console.log(order);
          dispatch(createOrder(order));
          Navigate("/success");
        } else {
          Alert.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      Alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, Alert, error]);

  return (
    <Fragment>
      <MetaData title={"Process Payment"} />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>

          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - Rs ${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
