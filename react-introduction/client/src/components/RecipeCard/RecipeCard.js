import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mdi/react";
import "../RecipeCard/RecipeCard.css";
import { mdiSilverwareForkKnife } from "@mdi/js";
import RecipeModal from "../RecipeModal/RecipeModal";

function RecipeCard(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_DESCRIPTION_LENGTH = 100;

  const handleCardClick = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  const getShortDescription = (description) => {
    if (description.length <= MAX_DESCRIPTION_LENGTH) return description;

    return (
      <span>
        {description.substring(0, MAX_DESCRIPTION_LENGTH)}
        <p className="span-text">...klikněte pro pokračování</p>
      </span>
    );
  };

  return (
    <>
      <Card onClick={handleCardClick}>
        <Card.Body>
          <Card.Img variant="top" src={props.recipe.imgUri} />
          <Card.Body>
            <Card.Title>
              <Icon path={mdiSilverwareForkKnife} size={0.8} color="#555" />
              {props.recipe.name}
            </Card.Title>
            <Card.Text>
              {getShortDescription(props.recipe.description)}
            </Card.Text>
          </Card.Body>
        </Card.Body>
      </Card>
      <RecipeModal
        show={isExpanded}
        onHide={handleClose}
        recipe={props.recipe}
      />
    </>
  );
}
export default RecipeCard;
