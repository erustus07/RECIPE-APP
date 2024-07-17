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
      console.log("Sending payload:", payload);  // Debugging line

      const response = await fetch(`http://localhost:5000/recipes/${recipeId}/ratings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),  // Use score here
        credentials: 'include', // Include credentials in the request
      });
      const data = await response.json();
      if (!response.ok) {
        alert(`Failed to add rating: ${data.message}`);
        console.log(data);
        throw new Error("Failed to add rating");
      } else {
        alert("Rating added successfully!");
        console.log(data);
        fetchRatings(); // Refresh ratings after adding new rating
      }
      setNewRating(""); // Clear input field after successful rating submission
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  return (
    <div>
      <h3>Ratings</h3>
      <ul className="ratings-container">
        {ratings.length === 0 ? (
          <p>No ratings yet.</p>
        ) : (
          ratings.map((rating) => (
            <li key={rating.id}>{rating.score}</li>  // Use score here
          ))
        )}
      </ul>
      <form onSubmit={handleAddRating}>
        <input
          type="number"
          value={newRating}
          onChange={(e) => setNewRating(e.target.value)}
          placeholder="Add a rating..."
          required
        />
        <button type="submit">Add Rating</button>
      </form>
    </div>
  );
};

export default RatingComponent;
