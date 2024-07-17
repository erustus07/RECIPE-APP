import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RecipeForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    description: '',
    ingredients: '',
    instructions: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    ingredients: Yup.string().required('Ingredients are required'),
    instructions: Yup.string().required('Instructions are required'),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await fetch('http://localhost:5000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include', // Include cookies in the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Failed to add recipe');
      }

      // Clear form upon successful submission
      navigate('/recipes');
    } catch (error) {
      console.error('Error adding recipe:', error);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Add New Recipe</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name:</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <Field as="textarea" id="description" name="description" />
              <ErrorMessage name="description" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="ingredients">Ingredients:</label>
              <Field as="textarea" id="ingredients" name="ingredients" />
              <ErrorMessage name="ingredients" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="instructions">Instructions:</label>
              <Field as="textarea" id="instructions" name="instructions" />
              <ErrorMessage name="instructions" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding Recipe...' : 'Add Recipe'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RecipeForm;
