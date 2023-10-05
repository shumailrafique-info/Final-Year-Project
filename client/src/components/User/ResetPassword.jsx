import React, { Fragment, useEffect, useState } from "react";
import Loading from "../Loading/Loading.jsx";
import "./resetPassword.scss";
import { useNavigate } from "react-router-dom";
import { resetPassword ,loadUser } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../Metadata/MetaData.jsx";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock.js";
import { useParams } from "react-router-dom";
// import VpnKeyIcon from "@material-ui/icons/VpnKey.js";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const Nevigate = useNavigate();
  const {token} = useParams();
  const Alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmpassword", confirmPassword);
    // console.log(oldPassword, newPassword, confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    const func34 = () => {
      if (error) {
        return Alert.error(error);
      }
      if (success) {
        Alert.success("Password Reset Successfully");
        dispatch(loadUser());
        Nevigate("/account");

        // dispatch({ type: "UPDATE_PASSWORD_RESET" });
      }
    };
    func34();
  }, [Alert, error, Nevigate, dispatch, success]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={"Change Password"} />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="update-Heading">Update Pass</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>{" "}
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  className="resetPasswordBtn"
                  value="Update"
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

export default ResetPassword;
