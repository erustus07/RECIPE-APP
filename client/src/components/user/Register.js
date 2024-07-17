import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "../styles/Register.css";

const RegisterForm = () => {
  const navigate = useNavigate();

  // Define Yup schema for form validation
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Initial form values
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert('Registration successful!');
        navigate('/login'); // Redirect to login after successful registration
      } else {
        const data = await response.json();
        setFieldError('general', data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setFieldError('general', 'Error registering user. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
              />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            <ErrorMessage name="general" component="div" className="error-message" />

          </Form>
        )}
      </Formik>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
