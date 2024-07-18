import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentComponent from "./CommentComponent";  
import TagComponent from "./TagComponent";
import FavoritesComponent from "./FavoriteComponent";
import RatingComponent from "./RatingComponent";



const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    instructions: "",
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:5000/recipes/${recipeId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await res.json();
        setRecipe(data);
        setFormData({
          name: data.name,
          description: data.description,
          ingredients: data.ingredients,
          instructions: data.instructions,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/recipes/${recipeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          ingredients: formData.ingredients,
          instructions: formData.instructions,
        }),
        credentials: 'include', // Include credentials in the request
      });
      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }
      const updatedRecipe = await response.json();
      setRecipe(updatedRecipe);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/recipes/${recipeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // Include credentials in the request
      });
      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }
      navigate("/recipes");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (!recipe.name) {
    return <p>Loading...</p>;
  }

  return (
    <div className="recipe-detail-container">
      {!editMode ? (
        <>
          <h2 className="recipe-detail-title">{recipe.name}</h2>
          <p className="recipe-detail-description">{recipe.description}</p>
          <h3>Ingredients:</h3>
          <pre className="recipe-detail-ingredients">{recipe.ingredients}</pre>
          <h3>Instructions:</h3>
          <pre className="recipe-detail-instructions">{recipe.instructions}</pre>
          <button className="edit-button" onClick={toggleEditMode}>
            Edit Recipe
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete Recipe
          </button>
          <button className="back-button" onClick={goBack}>
            Back to Recipes
          </button>
          <TagComponent recipeId={recipeId} />
          <CommentComponent recipeId={recipeId} />
          <FavoritesComponent recipeId={recipeId} />
          <RatingComponent recipeId={recipeId} />
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Ingredients:</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Instructions:</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={toggleEditMode}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default RecipeDetails;
