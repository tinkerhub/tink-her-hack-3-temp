import React from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/style.css"; 

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/cancerinfo');
  };
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to CancerAid</h1>
        <p className="home-description">
          Together, we can fight cancer and bring hope to those in need.
        </p>
        <button className="home-button" onClick={handleClick}>Click Here To Know More About Cancer</button>
      </div>
    </div>
  );
}

export default Home;