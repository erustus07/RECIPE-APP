import React from 'react';
import ReviewForm from './ReviewForm'; // Adjust import path as necessary

const RecipeDetails = ({ recipeId }) => {
    const handleSubmitReview = (reviewData) => {
        // Implement logic to handle submitting review data (e.g., API call)
        console.log('Submitting review:', reviewData);
        // Example: Implement API call to submit review data
    };

    return (
        <div className="recipe-details">
            {/* Existing recipe details */}
            <h2>Recipe Title</h2>
            <p>Recipe Description...</p>

            {/* ReviewForm component */}
            <ReviewForm recipeId={recipeId} onSubmit={handleSubmitReview} />
        </div>
    );
};

export default RecipeDetails; // or export default AddYours;
