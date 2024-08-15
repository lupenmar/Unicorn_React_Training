import React, { useEffect, useState } from "react";
import "../IngredientList/IngredientList.css";
import Icon from "@mdi/react";
import { mdiFoodDrumstick } from "@mdi/js";
import { ListGroup } from "react-bootstrap";

function IngredientsList({ ingredientIds }) {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchIngredientById(ingredientId) {
    const response = await fetch(
      `http://localhost:8000/ingredient/get?id=${ingredientId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        setError(null);
        const ingredientsInfo = await Promise.all(
          ingredientIds.map((id) => fetchIngredientById(id))
        );
        setIngredients(ingredientsInfo);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, [ingredientIds]);

  if (loading) return <div>Loading ingredients...</div>;
  if (error) return <div>Error loading ingredients: {error}</div>;

  return (
    <ListGroup className="ingredients-container">
      <ul className="ingredients-container">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id} className="ingredient-item">
            <Icon
              path={mdiFoodDrumstick}
              size={0.8}
              className="ingredient-icon"
            />
            <span className="ingredient-name">{ingredient.name}</span>
          </li>
        ))}
      </ul>
    </ListGroup>
  );
}

export default IngredientsList;
