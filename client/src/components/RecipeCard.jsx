import React from "react";

const RecipeCard = ({ recipe, redirectToRecipeDetails }) => {
  const handleRedirect = () => {
    redirectToRecipeDetails(recipe.id);
  };

  return (
    <div className="recipe-card">
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.name}</h3>
        <p className="recipe-card-description">{recipe.description}</p>
        <button className="recipe-card-button" onClick={handleRedirect}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
