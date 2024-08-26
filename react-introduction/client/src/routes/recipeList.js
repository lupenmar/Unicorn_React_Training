import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RecipeList from "../components/RecipeList/RecipeList";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import "bootstrap/dist/css/bootstrap.min.css";

function RecipeListRoute() {
  const [recipeListLoadCall, setRecipeListLoadCall] = useState({
    state: "pending",
  });
  let [searchParams] = useSearchParams();

  const recipeId = searchParams.get("id");

  useEffect(() => {
    setRecipeListLoadCall({
      state: "pending",
    });
    fetch(`http://localhost:3000/recipe/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipeListLoadCall({ state: "error", error: responseJson });
      } else {
        setRecipeListLoadCall({ state: "success", data: responseJson });
      }
    });
  }, [recipeId]);

  function getChild() {
    switch (recipeListLoadCall.state) {
      case "pending":
        return (
          <div className="loading">
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
      case "success":
        return (
          <>
            <RecipeList recipeList={recipeListLoadCall.data} />
          </>
        );
      case "error":
        return (
          <div className="error">
            <div>Nepodařilo se načíst data o třídě.</div>
            <br />
            <pre>{JSON.stringify(recipeListLoadCall.error, null, 2)}</pre>
          </div>
        );
      default:
        return null;
    }
  }

  return getChild();
}

export default RecipeListRoute;
