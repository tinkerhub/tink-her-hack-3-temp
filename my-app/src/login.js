import React, { useState } from "react";
import PostInput from "./Postinput";
import CommentAnalyzer from "./CommentAnalyzer";
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState(""); // To store the username input
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To track if the user is logged in

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (username.trim() !== "") {  
      onLogin(username);
      console.log(username)
      setIsLoggedIn(true); // Set login status to true
      console.log("is logged in",isLoggedIn);
      
    } else {
      alert("Please enter a valid username!"); // Show an alert if the username is empty
    }
  };
return(
    <div>
        <div>Welcome</div>
        {!isLoggedIn?( <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state
          />
          <button type="submit">Login</button>
        </form>):(
            <div>
                <h2>Welcome,{username}</h2>
                <PostInput/>
                <CommentAnalyzer/>
              
                <button onClick={() => setIsLoggedIn(false)}>Logout</button>
            </div>
        )}
    </div>
    

)
  
};

export default Login;


 