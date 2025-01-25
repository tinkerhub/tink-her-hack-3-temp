import React, { useState } from "react";

const PostInput = () => {
  const [post, setPost] = useState("");

  const handlePostSubmit = () => {
    alert("Post submitted successfully: " + post);
    setPost("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <textarea
        placeholder="Write your post here..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
        rows="4"
        cols="50"
        style={{ padding: "10px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handlePostSubmit} style={{ padding: "10px" }}>Submit Post</button>
    </div>
  );
};

export default PostInput;