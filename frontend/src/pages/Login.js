import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "../styles/login.css"; // Make sure this CSS file exists

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Prepare data to be sent in the request
    const loginData = {
      email: "email",
      password: "password",
    };

    try {
      // Send a POST request to the backend login endpoint
      const response = await axios.post("http://127.0.0.1:8000/auth/login", loginData);

      if (response.status === 200) {
        // Store the JWT token in localStorage (or sessionStorage)
        localStorage.setItem("token", response.data.access_token);

        // If login is successful, redirect to the home page
        navigate("/");
      }
    } catch (error) {
      console.error("Login error", error);
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email@"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
