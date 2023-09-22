import React, { useState } from "react";
import { Navigate } from "react-router-dom"; // Import Navigate
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/userLogin",
        formData
      );

      if (response.status === 200) {
        // Handle successful login
        console.log("Login successful");
        setIsAuthenticated(true); // Set authentication status to true
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginError("Invalid email or password");
      } else {
        setLoginError("An error occurred during login");
      }
      console.error("Error logging in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // If isAuthenticated is true, navigate to the home page
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {loginError && <p>{loginError}</p>}
      </form>
    </div>
  );
};

export default Login;