import React, { useState, useEffect } from "react";

const FavoritesComponent = ({ recipeId }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`http://localhost:5000/recipes/${recipeId}/favorites`, {
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setFavorites([]);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [recipeId]);

  const handleAddFavorite = async () => {
    try {
      const response = await fetch(`http://localhost:5000/recipes/${recipeId}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipe_id: recipeId }),
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) {
        alert(`Failed to add favorite: ${data.message}`);
        throw new Error("Failed to add favorite");
      } else {
        alert("Favorite added successfully!");
        fetchFavorites();
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  return (
    <div>
      <h3>Favorites</h3>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favorites.map(favorite => (
            <li key={favorite.id}>Favorite by user {favorite.user_id}</li>
          ))}
        </ul>
      )}
      <button onClick={handleAddFavorite}>Add to Favorites</button>
    </div>
  );
};

export default FavoritesComponent;
