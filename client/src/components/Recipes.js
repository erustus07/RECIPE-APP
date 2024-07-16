import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
            <div className="recipe-card" key={recipe.id}>
              <button onClick={() => redirectToRecipeDetails(recipe.id)}>
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
              </button>
            </div>
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
