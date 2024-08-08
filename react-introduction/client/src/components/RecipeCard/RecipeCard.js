import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mdi/react";
import "../RecipeCard/RecipeCard.css";

import { mdiSilverwareForkKnife } from "@mdi/js";

function RecipeCard(props) {
  return (
    <Card>
      <Card.Body>
        <Card.Img variant="top" src={props.recipe.imgUri} />
        <Card.Body>
          <Card.Title>
            <Icon path={mdiSilverwareForkKnife} size={0.8} color="#555" />{" "}
            {props.recipe.name}
          </Card.Title>
          <Card.Text className="scrollable-description">
            {props.recipe.description}
          </Card.Text>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
