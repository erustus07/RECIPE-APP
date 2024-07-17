import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: '',
    instructions: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form data:', formData);
      const response = await fetch('http://localhost:5000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'  // Include cookies in the request
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error data:', errorData);
        throw new Error('Failed to add recipe');
      }
      // Clear form data upon successful submission
      setFormData({
        name: '',
        description: '',
        ingredients: '',
        instructions: ''
      });
      // Redirect to recipes page after successful submission
      navigate('/recipes');
    } catch (error) {
      console.error('Error adding recipe:', error);
      setError('Failed to add recipe. Please try again.');
    }
  };
  
  

  return (
    <div>
      <h2>Add New Recipe</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Ingredients:</label>
          <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} required />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea name="instructions" value={formData.instructions} onChange={handleChange} required />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
