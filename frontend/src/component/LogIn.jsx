import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";
import "./Component.css";

const LogIn = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // State for login credentials
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // State for forgot password
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  // Handle input changes for login form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Submit login form
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

      // Reset form
      setCredentials({ email: "", password: "" });

      alert(`Successfully logged in as ${userData}`);
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  // Submit forgot password form
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://hotelroombook.onrender.com/forgot-password",
        { email: forgotPasswordEmail }
      );

      alert(res.data.message || "Reset instructions sent to your email.");

      // Reset state
      setForgotPasswordMode(false);
      setForgotPasswordEmail("");
    } catch (error) {
      console.error("Error during forgot password:", error.message);
      alert("Error occurred while processing forgot password.");
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row flex-box">
          <div className="col form-box">
            <div className="login-box">
              {forgotPasswordMode ? (
                <form
                  className="forget-form"
                  onSubmit={handleForgotPasswordSubmit}
                >
                  <h2 className="text-center">Forgot Password</h2>
                  <div className="forget-email">
                    <label htmlFor="forgotPasswordEmail">Email</label>
                    <input
                      type="email"
                      id="forgotPasswordEmail"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit">Reset Password</button>
                  <button
                    type="button"
                    className="toggle-btn"
                    onClick={() => setForgotPasswordMode(false)}
                  >
                    Back to Login
                  </button>
                </form>
              ) : (
                <form className="form-input" onSubmit={handleSubmit}>
                  <h2 className="text-center">Login</h2>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
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
                    Create an account? <Link to="/signup">Click Here</Link>
                  </p>
                  <div>
                    <button
                      type="button"
                      className="toggle-btn"
                      onClick={() => setForgotPasswordMode(true)}
                    >
                      Forgot Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
