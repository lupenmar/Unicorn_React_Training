import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiLoading, mdiPencilOutline } from "@mdi/js";
import IngredientList from "../../components/IngredientList/IngredientList";
import "../RecipeDetail/RecipeDetail.css";
import CreateRecipe from "../../components/CreateRecipeModal/CreateRecipe";
import DeleteRecipe from "../../components/DeleteRecipe/DeleteRecipe";
import { Alert } from "react-bootstrap";
import { useUser, roles } from "../../UserProvider";

function RecipeDetail() {
  const { currentUser } = useUser();
  const [recipeDetailLoadCall, setRecipeDetailLoadCall] = useState({
    state: "pending",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const navigate = useNavigate();
  const [deleteRecipeError, setDeleteRecipeError] = useState("");

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRecipeDeleted = (recipeId) => {
    if (recipeDetailLoadCall.state === "success") {
      navigate("/recipeList");
    }
  };

  let [searchParams] = useSearchParams();
  const recipeId = searchParams.get("id");

  const fetchRecipeDetails = useCallback(() => {
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

  useEffect(() => {
    fetchRecipeDetails();
  }, [fetchRecipeDetails, lastUpdated]);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleSaveSuccess = () => {
    setLastUpdated(Date.now());
    handleCloseModal();
  };

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
                {currentUser.role === roles.ADMIN && (
                  <div className="button-row">
                    <button onClick={handleEditClick} className="edit-button">
                      Upravit
                      <Icon
                        size={0.8}
                        path={mdiPencilOutline}
                        className="edit-icon"
                        style={{ color: "white", cursor: "pointer" }}
                      />
                    </button>
                    <DeleteRecipe
                      recipe={recipe}
                      onDelete={handleRecipeDeleted}
                      onError={(error) => setDeleteRecipeError(error)}
                    />
                  </div>
                )}
              </div>
              {deleteRecipeError && (
                <Alert
                  variant="danger"
                  onClose={() => setDeleteRecipeError("")}
                  dismissible
                >
                  {deleteRecipeError}
                </Alert>
              )}
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
            {currentUser.role === roles.ADMIN && (
              <CreateRecipe
                show={showEditModal}
                handleClose={handleCloseModal}
                initialRecipe={recipe}
                fetchRecipes={fetchRecipeDetails}
                onSaveSuccess={handleSaveSuccess}
              />
            )}
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
