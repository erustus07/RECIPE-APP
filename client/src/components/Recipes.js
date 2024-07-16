import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard'; // Adjust the path based on your project structure

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:5000/recipes');
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      // Handle error state or show a message to the user
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const redirectToRecipeDetails = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  const redirectToAddRecipe = () => {
    navigate('/recipes/add');
  };

  return (
    <div>
      <h2>Recipes</h2>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} redirectToRecipeDetails={redirectToRecipeDetails} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
      <button onClick={redirectToAddRecipe}>Add New Recipe</button>
    </div>
  );
};

export default Recipes;
