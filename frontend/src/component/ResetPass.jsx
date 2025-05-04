// ResetPass.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Component.css";

const ResetPass = () => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const { id, token } = useParams();
  useEffect(() => {
    console.log("id:", id);
    console.log("token:", token);
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.password !== passwords.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // POST request to backend with password reset data
      await axios.post(
        `https://hotelroombook.onrender.com/reset-password/${id}/${token}`,
        {
          password: passwords.password,
        }
      );

      alert("Password reset successfully!");
      setPasswords({ password: "", confirmPassword: "" });
      // Optionally redirect user to login page
      // navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error.message);
      alert("Failed to reset password. The link may have expired.");
    }
  };

  return (
    <div className="res-con d-flex align-items-center justify-content-center vh-100">
      <h1>Reset Password</h1>
      <div className="resetBox">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={passwords.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
