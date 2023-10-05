import React, { Fragment, useEffect, useState } from "react";
import Loading from "../Loading/Loading.jsx";
import "./UpdateProfile.scss";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { loadUser, updateUser } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../Metadata/MetaData.jsx";

function UpdateProfile() {
  const dispatch = useDispatch();
  const Nevigate = useNavigate();
  const Alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateUser(myForm));
  };

  const updateProfileimage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    setAvatar(e.target.files[0]);
  };

  useEffect(() => {
    if (error) {
      return Alert.error(error);
    }
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (isUpdated) {
      Alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      Nevigate("/account");

      dispatch({ type: "UPDATE_PROFILE_RESET" });
    }
    return;
  }, [Alert, error, Nevigate, dispatch, user, isUpdated, setName]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={"Update Profile"} />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="update-Heading">Update Profile</h2>
              <form
                className="updateProfileForm"
                onSubmit={updateProfileSubmit}
                encType="multipart/form-data"
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
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
                <div className="updateProfileImage">
                  <img src={avatarPreview} alt="Avtar Preview" />
                  <input
                    id="updateProfileInput"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileimage}
                  />
                </div>
                <input
                  type="submit"
                  className="updateProfileBtn"
                  value="Update"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdateProfile;
