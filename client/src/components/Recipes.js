import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import styles from "./styles/SearchStyles.module.css";

const Recipes = () => {
  const [recipes, setRecipesState] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:5000/recipes");
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipesState(data); // Set fetched recipes
    } catch (error) {
      console.error("Error fetching recipes:", error);
      // Handle error state or show a message to the user
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const redirectToRecipeDetails = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  const redirectToAddRecipe = () => {
    navigate("/recipes/add");
  };
  if (!recipes) {
    return <h1>Loading ....</h1>;
  }
  return (
    <div>
      <h2>Recipes</h2>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.inputField}
        />
        <button onClick={redirectToAddRecipe} className={styles.button}>
          Add New Recipe
        </button>
      </div>

      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              redirectToRecipeDetails={redirectToRecipeDetails}
            />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default Recipes;
