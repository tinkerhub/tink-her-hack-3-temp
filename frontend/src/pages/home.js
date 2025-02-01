import React from "react";
import "../styles/style.css"; // Import the CSS file

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to CancerAid</h1>
        <p className="home-description">
          Together, we can fight cancer and bring hope to those in need.
        </p>
        <button className="home-button">Click Here To Know More About Cancer</button>
      </div>
    </div>
  );
}

export default Home;