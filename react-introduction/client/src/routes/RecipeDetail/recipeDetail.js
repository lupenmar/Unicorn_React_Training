import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import IngredientList from "../../components/IngredientList/IngredientList";
import "../RecipeDetail/RecipeDetail.css";

function RecipeDetail() {
  const [recipeDetailLoadCall, setRecipeDetailLoadCall] = useState({
    state: "pending",
  });

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  let [searchParams] = useSearchParams();

  const recipeId = searchParams.get("id");

  useEffect(() => {
    setRecipeDetailLoadCall({
      state: "pending",
    });
    fetch(`http://localhost:8000/recipe/get?id=${recipeId}`, {
      method: "GET",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseJson = await response.json();
        setRecipeDetailLoadCall({ state: "success", data: responseJson });
      })
      .catch((error) => {
        setRecipeDetailLoadCall({ state: "error", error: error.toString() });
      });
  }, [recipeId]);

  function getChild() {
    switch (recipeDetailLoadCall.state) {
      case "pending":
        return (
          <div className="loading">
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
      case "success":
        const { data: recipe } = recipeDetailLoadCall;
        return (
          <>
            <div className="back-button-container">
              <button onClick={handleBackClick} className="back-button">
                Zpět
              </button>
            </div>
            <div className="recipe-detail-container">
              <div className="recipe-detail-image-container">
                <img src={recipe.imgUri} className="img-fluid" alt="Recipe" />
                <h1>{recipe.name}</h1>
              </div>
              <div className="recipe-detail-content">
                <p>{recipe.description}</p>
                <h2>Ingredients:</h2>
                <div className="ingredient-list-container">
                  <IngredientList
                    ingredientIds={recipe.ingredients.map(
                      (ingredient) => ingredient.id
                    )}
                  />
                </div>
              </div>
            </div>
          </>
        );
      case "error":
        return (
          <div className="error">
            <div>Nepodařilo se načíst data o třídě.</div>
            <br />
            <pre>{JSON.stringify(recipeDetailLoadCall.error, null, 2)}</pre>
          </div>
        );
      default:
        return null;
    }
  }

  return getChild();
}

export default RecipeDetail;
