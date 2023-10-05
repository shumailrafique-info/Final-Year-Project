import React, { Fragment, useEffect, useState } from "react";
import Loading from "../Loading/Loading.jsx";
import "./UpdatePassword.scss";
import { useNavigate } from "react-router-dom";
import { loadUser, updatePassword } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../Metadata/MetaData.jsx";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock.js";
import VpnKeyIcon from "@material-ui/icons/VpnKey.js";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const Nevigate = useNavigate();
  const Alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    const func34 = () => {
      if (error) {
        return Alert.error(error);
      }
      if (isUpdated) {
        Alert.success("Password Updated Successfully");
        dispatch(loadUser());
        Nevigate("/account");

        dispatch({ type: "UPDATE_PASSWORD_RESET" });
      }
    };
    func34();
  }, [Alert, error, Nevigate, dispatch, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={"Change Password"} />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="update-Heading">Update Pass</h2>
              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setoldPassword(e.target.value)}
                  />
                </div>{" "}
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setnewPassword(e.target.value)}
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
                  className="updatePasswordBtn"
                  value="Change"
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

export default UpdatePassword;
