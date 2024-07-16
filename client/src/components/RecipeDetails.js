import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});
  console.log(recipeId);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:5000/recipes/${recipeId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await res.json();
        // Ensure ingredients and instructions are arrays
        data.ingredients =
          data.ingredients.split(", ").map((item) => item.trim()) || [];
        data.instructions =
          data.instructions.split(", ").map((item) => item.trim()) || [];
        setRecipe(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  console.log(recipe);

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!recipe.name) {
    return <p>Loading...</p>; // Display loading message until recipe is fetched
  }

  return (
    <div className="recipe-detail-container">
      <h2 className="recipe-detail-title">{recipe.name}</h2>
      <p className="recipe-detail-description">{recipe.description}</p>
      <h3>Ingredients:</h3>
      <ul className="recipe-detail-ingredients">
        {Array.isArray(recipe.ingredients) &&
          recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
      </ul>
      <h3>Instructions:</h3>
      <ol className="recipe-detail-instructions">
        {Array.isArray(recipe.instructions) &&
          recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
      </ol>
      <button className="back-button" onClick={goBack}>
        Back to Recipes
      </button>
    </div>
  );
};

export default RecipeDetails;
