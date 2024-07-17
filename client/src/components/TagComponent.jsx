import React, { useState, useEffect } from "react";

const TagComponent = ({ recipeId }) => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const fetchTags = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/recipes/${recipeId}/tags`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTags(data); // Assuming data is an array of tags
    } catch (error) {
      console.error("Error fetching tags:", error);
      setTags([]); // Set tags to an empty array on error
    }
  };

  useEffect(() => {
    fetchTags();
  }, [recipeId]);

  const handleAddTag = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/recipes/${recipeId}/tags`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newTag }),
          credentials: "include", // Include credentials in the request
        }
      );
      const data = await response.json();
      if (!response.ok) {
        alert(`Failed to add tag: ${data.message}`);
        console.log(data);
        throw new Error("Failed to add tag");
      } else {
        alert("Tag added successfully!");
        console.log(data);
        fetchTags(); // Refresh tags after adding new tag
      }
      setNewTag(""); // Clear input field after successful tag submission
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  return (
    <div>
      <h3>Tags</h3>
      <ul className="tags-container">
        {tags.length === 0 ? (
          <p>No tags yet.</p>
        ) : (
          tags.map((tag) => (
            <p key={tag.id}>{tag.name}</p>
          ))
        )}
      </ul>
      <form onSubmit={handleAddTag}>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add a tag..."
          required
        />
        <button type="submit">Add Tag</button>
      </form>
    </div>
  );
};

export default TagComponent;
