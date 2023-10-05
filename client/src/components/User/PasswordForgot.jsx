import React, { Fragment, useEffect, useState } from "react";
import Loading from "../Loading/Loading.jsx";
import "./PasswordFrogot.scss";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../Metadata/MetaData.jsx";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const PasswordForgot = () => {
  const dispatch = useDispatch();
  const Nevigate = useNavigate();
  const Alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("email", email);

    // console.log(oldPassword, newPassword, confirmPassword);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    const func34 = () => {
      if (error) {
        return Alert.error(error);
      }
      if (message) {
        Alert.success(message);
        
      }
    };
    func34();
  }, [Alert, error, Nevigate, dispatch, message]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={"Forgot Password"} />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="update-Heading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  className="forgotPasswordBtn"
                  value="Send"
                  // disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default PasswordForgot;
