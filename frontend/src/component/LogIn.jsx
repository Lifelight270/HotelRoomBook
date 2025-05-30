import { useState } from "react";
import axios from "axios";
import React, { useContext } from "react";
import { UserContext } from "./UserContext";

import "./Component.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // const { id, token } = useParams();
  // console.log(`${id} and ${token}`);

  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  // const [showSignup, setShowSignup] = useState(false);

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://hotelroombook.onrender.com/forgot-password", {
        email: forgotPasswordEmail,
      });

      alert("Reset password instructions sent to your email");

      setForgotPasswordMode(false);
      setForgotPasswordEmail("");
    } catch (error) {
      console.error("Error during forgot password:", error.message);
      alert("Error occurred while processing forgot password");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://hotelroombook.onrender.com/login",
        credentials
      );

      const userData = res.data.getUser.username;

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setCredentials({
        email: "",
        password: "",
      });
      navigate("/");
      alert(`Successfully logged in as ${userData}`);
      // Optionally redirect user after login
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Login failed");
    }
  };

  return (
    <>
      <div className="login">
        <div className="container">
          <div className="row flex-box">
            <div className="col form-box">
              <div className="login-box">
                {forgotPasswordMode ? (
                  <form
                    className="forget-form"
                    onSubmit={handleForgotPasswordSubmit}>
                    <h2 className="text-center">Forgot Password</h2>
                    <div className="forget-email">
                      <label htmlFor="forgotPasswordEmail">Email</label>
                      <input
                        type="email"
                        id="forgotPasswordEmail"
                        name="forgotPasswordEmail"
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit">Reset Password</button>
                  </form>
                ) : (
                  <form className="form-input" onSubmit={handleSubmit}>
                    <h2 className="text-center">Login</h2>
                    <div>
                      <label htmlFor="identifier">Email</label>
                      <input
                        type="email"
                        id="identifier"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="login-btn">
                      Login
                    </button>
                    <hr />
                    <p>
                      Create One?
                      <Link to="/signup">Click Here</Link>
                    </p>
                    <div>
                      <p>
                        <button
                          type="button"
                          className="login-btn"
                          onClick={() =>
                            setForgotPasswordMode((prevMode) => !prevMode)
                          }>
                          {forgotPasswordMode
                            ? "Back to Login"
                            : "Forgot Password"}
                        </button>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
