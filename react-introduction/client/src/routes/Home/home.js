import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useUser, roles } from "../../UserProvider";

function Home() {
  const { currentUser } = useUser();

  return (
    <div className="home-container">
      <div className="home-section">
        <h1>Vítejte v Chutně a rychle</h1>
        <p>Objevte nejlepší recepty z celého světa.</p>
        {currentUser.role === roles.ADMIN || currentUser.role === roles.USER ? (
          <>
            <Link to="/recipeList" className="explore-button">
              Zobrazit recepty
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
