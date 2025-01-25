import React, { useState } from "react";
import Login from "./Login"; // Import the Login component

const Homepage = () => {
  const [user, setUser] = useState(null); // To track the logged-in user

  const handleLogin = (username) => {
    setUser({ username }); 
    console.log("user state updated:",{ username });
  };

  return (
    <div>
      {/* Welcome message */}
      <h1>Welcome to Hackathon</h1>
      <p>Your platform for cyberbullying detection and prevention.</p>

      {/* Conditionally render Login or personalized welcome message */}
      {!user ? (
        <Login onLogin={handleLogin} /> // Show Login form if user is not logged in
      ) : (
        <div>
          <h2>Hello, {user.username}!</h2>
          <p>Get started with your project.</p>
          <button onClick={() => setUser(null)}>Logout</button> {/* Logout button */}
        </div>
      )}
    </div>
  );
};

export default Homepage;