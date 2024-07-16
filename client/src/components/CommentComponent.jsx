import React, { useEffect, useState } from "react";

export default function CommentComponent({ recipeId }) {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState(null);
  const recipe_id = recipeId;
  useEffect(() => {
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

    fetchComments();
  }, [recipeId]);

  console.log(comments);

  if (comments === null) {
    return <p>Loading comments...</p>;
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/recipes/${recipeId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content, recipe_id }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(`${data}`);
        console.log(data);
        throw new Error("Did not worl");
      } else {
        alert(`${data}`);
        console.log(data);
      }
    } catch (error) {}
  };
  return (
    <div>
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="comments-container">
          {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      )}
      <form onSubmit={HandleSubmit}>
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
