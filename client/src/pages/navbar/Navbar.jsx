import { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import logo from "../../../logo.jpg";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("jwtToken"));

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setLoggedIn(false);
  };

  const renderAuthenticatedLinks = () => (
    <>
      <Link to="/" className="link">
        <span>Homepage</span>
      </Link>
      <Link to="/create" className="link">
        <span>Create Task</span>
      </Link>
      <Link to="/tasks" className="link">
        <span>Tasks</span>
      </Link>
    </>
  );

  const renderUnauthenticatedLinks = () => (
    <>
      <Link to="/login" className="link">
        <span>Login</span>
      </Link>
      <Link to="/register" className="link">
        <span>Register</span>
      </Link>
    </>
  );

  return (
    <div className="navbar">
      <div className="content">
        <div className="left">
          <img src={logo} alt="" />
          {loggedIn ? renderAuthenticatedLinks() : renderUnauthenticatedLinks()}
        </div>
        <div className="right">
          {loggedIn ? (
            <>
              <span>USER</span>
              <img
                src="https://pbs.twimg.com/profile_images/1356333120992149505/-qvakEK7_200x200.jpg"
                alt=""
              />
              <button
                style={{
                  width: "15rem",
                  height: "6rem",
                  background: "darkblue",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "2.7rem",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { Navbar };
