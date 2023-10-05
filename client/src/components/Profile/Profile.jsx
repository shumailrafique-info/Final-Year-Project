import { Fragment } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import MetaData from "../Metadata/MetaData";
import "./Profile.scss";

const Profile = () => {
  const Navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

  if (isAuthenticated === false) {
    Navigate("/login");
  }

  useEffect(() => {
    const isauth = () => {
      if (isAuthenticated === false) {
        Navigate("/login");
      }
    };
    isauth();
  }, [Navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {isAuthenticated ? (
            <MetaData title={`${user.name}'s Profile`} />
          ) : (
            <MetaData title={`Profile`} />
          )}

          {isAuthenticated ? (
            <div className="profileContainer">
              <div>
                <h1>My Profile</h1>
                <img src={user.avatar && user.avatar.url} alt={user.name} />
                <Link to={"/me/update"}>Edit Profile</Link>
              </div>

              <div>
                <div>
                  <h4>Full Name</h4>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h4>Joined On</h4>
                  <p>{String(user.createdAt).substr(0, 10)}</p>
                </div>
                <div>
                  <Link to={"/orders"}>My Orders</Link>
                  <Link to={"/password/update"}>Change Password</Link>
                </div>
              </div>
            </div>
          ) : (
            "Loding"
          )}
        </Fragment>
      )}
    </>
  );
};

export default Profile;
