import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "../RecipeGridList/RecipeGridList.css";

function RecipeGridList(props) {
  return (
    <Row xs={1} md={2} lg={3} className="recipe-grid-list g-4">
      {props.recipeList.map((recipe, idx) => (
        <Col key={idx}>
          <RecipeCard recipe={recipe} />
        </Col>
      ))}
    </Row>
  );
}
export default RecipeGridList;
