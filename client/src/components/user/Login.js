import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import "../styles/Login.css"; // Import your CSS file for styling

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for controlling popup visibility

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include" // Include cookies in the request
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem("user", JSON.stringify({ username }));
      setIsAuth(true); // Set authentication state to true
      setShowPopup(true); // Set state to show popup message
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password"); // Set error message for invalid credentials
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate("/recipes"); // Redirect after closing popup
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>

      {/* Popup message */}
      {showPopup && (
        <div className="popup">
          <p>Login successful!</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Login;
