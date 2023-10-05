import React, { Fragment, useEffect, useState } from "react";
import Loading from "../Loading/Loading.jsx";
import "./LoginSignup.scss";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { login, register } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useLocation } from "react-router-dom";

const LoginSignup = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const Nevigate = useNavigate();
  const Alert = useAlert();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const redirect =
    location.search.split("=")[1] === "shipping" ? "/shipping" : "/account";
 const [eventa,seteventa] = useState("")
 const [stringa,setstringa] = useState("")

    const switchTabs = (e, tab) => {
      if (tab === "login") {
        switherTab.current.classList.remove("shiftToRigth");
  
        registerTab.current.classList.remove("shiftToNeutral");
        loginTab.current.classList.remove("shiftToLeft");
        seteventa(e)
        setstringa(tab)
      }
      if (tab === "register") {
        switherTab.current.classList.add("shiftToRigth");
        registerTab.current.classList.add("shiftToNeutral");
  
        loginTab.current.classList.add("shiftToLeft");
        seteventa(e)
        setstringa(tab)
      }
    };

  useEffect(() => {
    const loadingded = () => {
      if (error) {
        switchTabs(eventa,stringa)
        return Alert.error(error);
      }
      if (isAuthenticated) {
        Nevigate(redirect);
      }
    };
    loadingded();
  }, [Alert, error, isAuthenticated, Nevigate, redirect]);
  // if (isAuthenticated) {
  //   Nevigate("/account");
  // }
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switherTab = useRef(null);

  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

 

  

  const loginSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(login(loginEmail, loginPassword));
    setloginEmail("");
    setLoginPassword("");
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("avatar", avatar);
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    dispatch(register(myForm));
  };

  const registerDataChange = async (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);

      setAvatar(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switherTab}></button>
              </div>
              <form
                className="loginForm"
                ref={loginTab}
                onSubmit={loginSubmitHandler}
              >
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setloginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>

              <form
                className="signUpForm"
                onSubmit={registerSubmit}
                ref={registerTab}
                encType="multipart/form-data"
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="registerImage">
                  <img src={avatarPreview} alt="Avtar Preview" />
                  <input
                    id="registerInput"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input
                  type="submit"
                  className="signUpBtn"
                  value="Register"
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

export default LoginSignup;
