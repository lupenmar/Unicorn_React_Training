import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

function RecipeModal({ show, onHide, recipe }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{recipe.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={recipe.imgUri} className="img-fluid" alt="Recipe" />
        <p>{recipe.description}</p>
      </Modal.Body>
    </Modal>
  );
}

export default RecipeModal;
