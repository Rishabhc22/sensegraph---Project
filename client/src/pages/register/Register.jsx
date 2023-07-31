import { useState, useRef, useEffect } from "react";
import "./register.scss";
import logo from "../../../logo.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Register = () => {
  const url = "http://localhost:5000/api/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleStart = (e) => {
    e.preventDefault();
    const emailValue = emailRef.current.value;

    if (isValidEmail(emailValue)) {
      setEmail(emailValue);
      emailRef.current.value = "";
    } else {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
        closeOnClick: true,
        style: {
          fontSize: "22px",
        },
      });
    }
  };

  const handleFinish = (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    passwordRef.current.value = "";
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  useEffect(() => {
    if (email && password) {
      const data = {
        username: email,
        password: password,
      };

      const func = async () => {
        try {
          const response = await axios.post(`${url}users/register`, data);
          setMessage(response.data.message);
          setRegistrationSuccess(true);
        } catch (err) {
          console.log(err);
        }
      };

      func();
    }
  }, [email, password]);

  useEffect(() => {
    if (registrationSuccess && message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
        closeOnClick: true,
        style: {
          fontSize: "22px",
        },
      });
    }
  }, [registrationSuccess, message]);

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={logo} alt="" />
          <button className="loginButton">SIGN IN</button>
        </div>
      </div>

      <div className="box">
        <h1>Please complete your registration.</h1>
        <h2>Create, Update and see all your Tasks here.</h2>
        {!email ? (
          <div className="input">
            <input
              type="email"
              placeholder="email address"
              ref={emailRef}
              required
            />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <div className="input">
            <input
              type="password"
              placeholder="password"
              ref={passwordRef}
              required
            />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </div>
        )}
        {registrationSuccess && (
          <Link
            to="/login"
            className="loginLink"
            style={{
              color: "inherit",
              textDecoration: "none",
              margin: "50px",
              fontSize: "30px",
            }}
          >
            Successfully Registered! Proceed to the Login Page
            <div>
              <button
                style={{
                  marginLeft: "250px",
                  marginTop: "20px",
                  fontSize: "30px",
                  width: "20rem",
                  height: "7rem",
                  background: "dodgerblue",
                  borderRadius: "5px",
                  border: "none",
                }}
              >
                Login
              </button>
            </div>
          </Link>
        )}
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

export default Register;
