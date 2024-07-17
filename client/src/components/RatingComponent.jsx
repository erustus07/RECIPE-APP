import React, { useState, useEffect } from "react";

const RatingComponent = ({ recipeId }) => {
  const [ratings, setRatings] = useState([]);
  const [newRating, setNewRating] = useState("");

  const fetchRatings = async () => {
    try {
      const response = await fetch(`http://localhost:5000/recipes/${recipeId}/ratings`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRatings(data); // Assuming data is an array of ratings
    } catch (error) {
      console.error("Error fetching ratings:", error);
      setRatings([]); // Set ratings to an empty array on error
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [recipeId]);

  const handleAddRating = async (e) => {
    e.preventDefault();
    try {
      const payload = { score: newRating };  // Create the payload

      const response = await fetch(`http://localhost:5000/recipes/${recipeId}/ratings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),  // Use score here
        credentials: 'include', // Include credentials in the request
      });
      const data = await response.json();
      if (!response.ok) {
        alert(`Failed to add rating: ${data.message}`);
        throw new Error("Failed to add rating");
      } else {
        alert("Rating added successfully!");
        fetchRatings(); // Refresh ratings after adding new rating
      }
      setNewRating(""); // Clear input field after successful rating submission
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {'★'.repeat(fullStars)}
        {halfStars ? '☆' : ''}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  return (
    <div>
      <h3>Ratings</h3>
      <ul className="ratings-container">
        {ratings.length === 0 ? (
          <p>No ratings yet.</p>
        ) : (
          ratings.map((rating) => (
            <p key={rating.id}>
              {renderStars(rating.score)} {/* Render stars based on rating score */}
            </p>
          ))
        )}
      </ul>
      <form onSubmit={handleAddRating}>
        <input
          type="number"
          value={newRating}
          onChange={(e) => setNewRating(e.target.value)}
          placeholder="Add a rating..."
          min="1"
          max="5"
          required
        />
        <button type="submit">Add Rating</button>
      </form>
    </div>
  );
};

export default RatingComponent;
