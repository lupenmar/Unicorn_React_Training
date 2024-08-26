import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

function Home() {
  return (
    <div className="home-container">
      <div className="home-section">
        <h1>Vítejte v Chutně a rychle</h1>
        <p>Objevte nejlepší recepty z celého světa.</p>
        <Link to="/recipeList" className="explore-button">Zobrazit recepty</Link>
      </div>
    </div>
  );
}

export default Home;
