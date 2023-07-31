import "./login.scss";
import logo from "../../../logo.jpg";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const url = "http://localhost:5000/api/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [webToken, setWebToken] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    setEmail(emailRef.current.value);
    setPassword(passwordRef.current.value);
  };

  useEffect(() => {
    if (email && password) {
      const data = {
        username: email,
        password: password,
      };

      const sendData = async () => {
        try {
          const res = await axios.post(`${url}users/login`, data);
          setWebToken(res.data.token);
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
          toast.success("Successfully Logged In!", {
            style: {
              fontSize: "22px",
            },
          });
        } catch (err) {
          console.log(err);
          toast.error("Invalid username or password", {
            style: {
              fontSize: "22px",
            },
          });
        }
      };

      sendData();
    }
  }, [email, password]);

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={logo} alt="" />
        </div>
      </div>
      <div className="box">
        <form>
          <h1>Login</h1>
          <input type="email" placeholder="Email" ref={emailRef} />
          <input type="password" placeholder="Password" ref={passwordRef} />
          <button className="loginButton" onClick={handleLogin}>
            Login
          </button>
          <span>
            New to Task Manager?{" "}
            <b>
              <Link to="/register">Register Now.</Link>
            </b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure youre not a
            bot. <b>Learn more.</b>
          </small>
          {webToken && (
            <>
              <span>Welcome to Task Manager!</span>
              <Link to="/" className="homeButton">
                <button
                  className="loginButton"
                  style={{ background: "white", color: "black" }}
                >
                  Proceed to Homepage
                </button>
              </Link>
            </>
          )}
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
