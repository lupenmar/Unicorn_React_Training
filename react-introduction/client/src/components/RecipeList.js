import React from "react";
import RecipeCard from "./RecipeCard/RecipeCard";
import "bootstrap/dist/css/bootstrap.min.css";

function RecipeList(props) {
  function getRecipeList(recipeList) {
    return recipeList.map((recipe) => {
      return (
        <div key={recipe.id} className="col-md-4 mb-4">
          <RecipeCard recipe={recipe} />
        </div>
      );
    });
  }

  return (
    <div className="container">
      <div className="row">{getRecipeList(props.recipeList)}</div>
    </div>
  );
}

export default RecipeList;
