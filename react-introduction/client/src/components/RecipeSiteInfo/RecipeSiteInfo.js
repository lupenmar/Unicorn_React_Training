import React from "react";
import "../RecipeSiteInfo/RecipeSiteInfo.css";

function RecipeSiteInfo(props) {
  return <h1 className="recipe-site-name">{props.recipeSite.name}</h1>;
}

export default RecipeSiteInfo;
