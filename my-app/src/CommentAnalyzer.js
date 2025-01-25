import React, { useState } from "react";

const CommentAnalyzer = () => {
  const [comment, setComment] = useState("");
  const [notification, setNotification] = useState(null);

  const analyzeComment = (input) => {
    const vulgarWords = ["badword1", "badword2", "insult"]; // Add vulgar words here
    return vulgarWords.some((word) => input.includes(word));
  };

  const handleCommentSubmit = () => {
    const isVulgar = analyzeComment(comment);
    if (isVulgar) {
      setNotification("This comment contains vulgar content. Do you want to report?");
    } else {
      alert("Comment submitted successfully.");
    }
    setComment("");
  };

  const handleReport = () => {
    alert("Comment reported successfully!");
    setNotification(null);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <textarea
        placeholder="Write a comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="4"
        cols="50"
        style={{ padding: "10px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleCommentSubmit} style={{ padding: "10px" }}>Submit Comment</button>
      {notification && (
        <div style={{ marginTop: "10px", color: "red" }}>
          <p>{notification}</p>
          <button onClick={handleReport} style={{ padding: "10px", marginRight: "10px" }}>Report</button>
          <button onClick={() => setNotification(null)} style={{ padding: "10px" }}>Ignore</button>
        </div>
      )}
    </div>
  );
};

export default CommentAnalyzer;