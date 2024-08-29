import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./CreateTask.css";

function CreateTask({ show, handleClose }) {
  const [ingredients, setIngredients] = useState([]);
  const [validated, setValidated] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeImgUri, setRecipeImgUri] = useState("");
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
    setRecipeImgUri("");
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

  const submitRecipe = async (recipeData) => {
    const ingredientsWithNumericAmount = recipeData.ingredients.map((ing) => ({
      ...ing,
      amount: parseInt(ing.amount, 10), 
    }));

    const dataToSend = {
      ...recipeData,
      ingredients: ingredientsWithNumericAmount,
    };

    try {
      const response = await fetch("http://localhost:8000/recipe/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        throw new Error("Server response was not ok.");
      }
      const responseData = await response.json();
      console.log("Recipe created:", responseData);
    } catch (error) {
      console.error("Failed to create recipe:", error);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const recipe = {
      name: recipeName,
      description: recipeDescription,
      imgUri: recipeImgUri,
      ingredients: recipeIngredients.map((ing) => ({
        id: ing.ingredientId,
        amount: ing.amount,
        unit: ing.unit,
      })),
      category: recipeCategory,
    };
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }
    console.log("Celý recept:", recipe);
    submitRecipe(recipe);
    handleCloseModal();
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Přidat nový recept</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formRecipeName">
            <Form.Label>Název receptu</Form.Label>
            <Form.Control
              type="text"
              placeholder="Zadejte název receptu"
              maxLength={25}
              minLength={2}
              required
              onChange={(e) => setRecipeName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Zadejte název s maximální délkou 25 znaků
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRecipeDescription">
            <Form.Label>Postup receptu</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              maxLength={125}
              minLength={10}
              required
              placeholder="Popište postup receptu"
              onChange={(e) => setRecipeDescription(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Zadejte popis s délkou 10-125 znaků
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRecipeCategory">
            <Form.Label>Kategorie</Form.Label>
            <Form.Select
              value={recipeCategory}
              required
              onChange={(e) => setRecipeCategory(e.target.value)}
            >
              <option value="">Vyberte kategorii</option>
              <option value="Breakfast">Snídaně</option>
              <option value="Lunch">Oběd</option>
              <option value="Dinner">Večeře</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Vyberte kategorii!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRecipeImgUri">
            <Form.Label>URL obrázku</Form.Label>
            <Form.Control
              type="text"
              placeholder="Zadejte URL obrázku"
              value={recipeImgUri}
              onChange={(e) => setRecipeImgUri(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Chceme vidět obrázek!
            </Form.Control.Feedback>
          </Form.Group>
          <h5>Ingredience</h5>
          <Form.Control
            type="text"
            required
            value={recipeIngredients.length > 0 ? "present" : ""}
            style={{ display: "none" }}
            onChange={() => {}}
          />
          <Form.Control.Feedback type="invalid">
            Přidejte alespoň jeden ingredience.
          </Form.Control.Feedback>
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
                  type="number"
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
