import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ recipeId, onSubmit }) => {
    const [rating, setRating] = useState(0); // Initial rating state
    const [comment, setComment] = useState('');

    const handleRatingChange = (event) => {
        setRating(Number(event.target.value)); // Update the rating state
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ recipeId, rating, comment }); // Submit the form data
        // Clear form fields
        setRating(0);
        setComment('');
    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <label>
                Rating:
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={handleRatingChange}
                    required
                />
            </label>
            <label>
                Comment:
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
