import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: '',
    instructions: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/recipes/${recipeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details');
        }
        const data = await response.json();
        setRecipe(data);
        setFormData({
          name: data.name,
          description: data.description,
          ingredients: Array.isArray(data.ingredients) ? data.ingredients.join('\n') : data.ingredients,
          instructions: Array.isArray(data.instructions) ? data.instructions.join('\n') : data.instructions,
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  const handleDeleteRecipe = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        const response = await fetch(`http://localhost:5000/recipes/${recipeId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete recipe');
        }
        alert('Recipe deleted successfully');
        navigate('/recipes');
      } catch (error) {
        console.error('Delete recipe error:', error);
        alert('Failed to delete recipe');
      }
    }
  };

  const handleEditRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:5000/recipes/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          ingredients: formData.ingredients.split('\n').map(line => line.trim()).filter(line => line !== ''),
          instructions: formData.instructions.split('\n').map(line => line.trim()).filter(line => line !== ''),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }
      alert('Recipe updated successfully');
      setEditMode(false);
    } catch (error) {
      console.error('Update recipe error:', error);
      alert('Failed to update recipe');
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <div>
      <h2>{recipe.name}</h2>
      {editMode ? (
        <div>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </label>
          <label>
            Ingredients (one per line):
            <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} />
          </label>
          <label>
            Instructions (one per line):
            <textarea name="instructions" value={formData.instructions} onChange={handleChange} />
          </label>
          <button onClick={handleEditRecipe}>Save Changes</button>
          <button onClick={toggleEditMode}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{recipe.description}</p>
          <h3>Ingredients:</h3>
          <ul>
            {Array.isArray(recipe.ingredients) ? (
              recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))
            ) : (
              <li>{recipe.ingredients}</li>
            )}
          </ul>
          <h3>Instructions:</h3>
          <ol>
            {Array.isArray(recipe.instructions) ? (
              recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))
            ) : (
              <li>{recipe.instructions}</li>
            )}
          </ol>
          <div>
            <button onClick={handleDeleteRecipe}>Delete Recipe</button>
            <button onClick={toggleEditMode}>Edit Recipe</button>
          </div>
        </div>
      )}
      <Link to="/recipes">Back to Recipes</Link>
    </div>
  );
};

export default RecipeDetails;
