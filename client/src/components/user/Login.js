 import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/Login.css"; // Import your CSS file for styling

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();
  const initialValues = {
    username: "",
    password: "",
  };

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem("user", JSON.stringify({ username: values.username }));
      setIsAuth(true); // Set authentication state to true
      navigate("/recipes"); // Redirect after successful login
    } catch (error) {
      console.error("Login error:", error);
      setFieldError("password", "Invalid username or password"); // Set error message for invalid credentials
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username:</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
