import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import "../styles/Login.css"; // Import your CSS file for styling

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setIsAuth } = useAuth(); // Access setIsAuth from AuthProvider
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Reset form fields and errors upon successful login
      setUsername('');
      setPassword('');
      setError(null);

      // Update authentication state
      setIsAuth(true);

      // Redirect to home page after successful login
      navigate('/');
    } catch (error) {
      setError('Invalid username or password');
      console.error('Login error:', error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />; // Redirect to home page after successful login
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default Login;
