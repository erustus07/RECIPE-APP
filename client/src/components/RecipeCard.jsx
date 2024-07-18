import React from "react";
import styles from "./styles/RecipeCard.module.css";

const RecipeCard = ({ recipe, redirectToRecipeDetails }) => {
  const handleRedirect = () => {
    redirectToRecipeDetails(recipe.id);
  };

  return (
    <div className={styles.recipeCard}>
      <div className={styles.recipeCardContent}>
        <h3 className={styles.recipeCardTitle}>{recipe.name}</h3>
        <p className={styles.recipeCardDescription}>{recipe.description}</p>
        <button className={styles.recipeCardButton} onClick={handleRedirect}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
