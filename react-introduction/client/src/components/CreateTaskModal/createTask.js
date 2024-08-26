import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./CreateTask.css";

function CreateTask({ show, handleClose }) {
  const [ingredients, setIngredients] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeCategory, setRecipeCategory] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const [isAddingIngredient, setIsAddingIngredient] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    ingredientId: "",
    name: "",
    amount: "",
    unit: "",
  });

  const handleCloseModal = () => {
    setRecipeName("");
    setRecipeDescription("");
    setRecipeCategory("");
    setRecipeIngredients([]);
    handleClose();
  };

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedName =
      ingredients.find((ing) => ing.id === selectedId)?.name || "";
    setNewIngredient({
      ...newIngredient,
      ingredientId: selectedId,
      name: selectedName,
    });
  };

  const addIngredientToList = () => {
    if (
      newIngredient.ingredientId &&
      newIngredient.amount &&
      newIngredient.unit
    ) {
      setRecipeIngredients([...recipeIngredients, newIngredient]);
      setNewIngredient({ ingredientId: "", name: "", amount: "", unit: "" });
      setIsAddingIngredient(false);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8000/ingredient/list`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setIngredients(data))
      .catch((error) => console.error("Error fetching ingredients:", error));
  }, []);

  const handleRemoveIngredient = (index) => {
    const newRecipeIngredients = [...recipeIngredients];
    newRecipeIngredients.splice(index, 1);
    setRecipeIngredients(newRecipeIngredients);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const recipe = {
      name: recipeName,
      description: recipeDescription,
      ingredients: recipeIngredients.map((ing) => ({
        id: ing.ingredientId,
        amount: ing.amount,
        unit: ing.unit,
      })),
      category: recipeCategory,
    };
    console.log("Celý recept:", recipe);
    handleCloseModal();
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Přidat nový recept</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formRecipeName">
            <Form.Label>Název receptu</Form.Label>
            <Form.Control
              type="text"
              placeholder="Zadejte název receptu"
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRecipeDescription">
            <Form.Label>Postup receptu</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Popište postup receptu"
              onChange={(e) => setRecipeDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRecipeCategory">
            <Form.Label>Kategorie</Form.Label>
            <Form.Select
              value={recipeCategory}
              onChange={(e) => setRecipeCategory(e.target.value)}
            >
              <option value="">Vyberte kategorii</option>
              <option value="Breakfast">Snídaně</option>
              <option value="Lunch">Oběd</option>
              <option value="Dinner">Večeře</option>
            </Form.Select>
          </Form.Group>
          <h5>Ingredience</h5>
          {recipeIngredients.map((ingredient, index) => (
            <div key={index} className="ingredient-item">
              <span>
                {ingredient.name} - {ingredient.amount} {ingredient.unit}
              </span>
              <Button
                className="remove-ingredient-button"
                variant="outline-danger"
                onClick={() => handleRemoveIngredient(index)}
              >
                &times;
              </Button>
            </div>
          ))}
          {!isAddingIngredient && (
            <Button
              variant="outline-success"
              onClick={() => setIsAddingIngredient(true)}
            >
              + Přidat ingredienci
            </Button>
          )}
          {isAddingIngredient && (
            <div className="add-ingredient-form">
              <Form.Group className="mb-3">
                <Form.Select
                  value={newIngredient.ingredientId}
                  onChange={handleSelectChange}
                >
                  <option value="">Vyberte ingredienci</option>
                  {ingredients.map((ing) => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Množství</Form.Label>
                <Form.Control
                  type="text"
                  value={newIngredient.amount}
                  onChange={(e) =>
                    setNewIngredient({
                      ...newIngredient,
                      amount: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Jednotka</Form.Label>
                <Form.Control
                  type="text"
                  value={newIngredient.unit}
                  onChange={(e) =>
                    setNewIngredient({ ...newIngredient, unit: e.target.value })
                  }
                />
              </Form.Group>
              <Button
                className="confirm-ingredient-button"
                variant="success"
                onClick={addIngredientToList}
              >
                Přidat ingredienci
              </Button>
            </div>
          )}
          <Button className="save-button" variant="primary" type="submit">
            Uložit recept
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateTask;
