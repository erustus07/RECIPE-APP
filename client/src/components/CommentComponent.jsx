import React, { useEffect, useState } from "react";

export default function CommentComponent({ recipeId }) {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/recipes/${recipeId}/comments`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setComments(data); // Assuming data is an array of comments
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]); // Set comments to an empty array on error
    }
  };

  useEffect(() => {
    fetchComments();
  }, [recipeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/recipes/${recipeId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content, recipe_id: recipeId }),
          credentials: 'include', // Include credentials in the request
        }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(`Failed to add comment: ${data.message}`);
        console.log(data);
        throw new Error("Failed to add comment");
      } else {
        alert("Comment added successfully!");
        console.log(data);
        fetchComments(); 
      }
      setContent(""); 
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (comments === null) {
    return <p>Loading comments...</p>;
  }

  return (
    <div>
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="comments-container">
          {comments.map((comment) => (
            <p key={comment.id}>{comment.content}</p>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          name="content"
          id="content"
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add comment</button>
      </form>
    </div>
  );
}
