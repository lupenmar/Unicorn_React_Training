import "./App.css";
import { useEffect, useState } from "react";
import RecipeSiteInfo from "./components/RecipeSiteInfo/RecipeSiteInfo";
import RecipeList from "./components/RecipeList/RecipeList";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [recipeListLoadCall, setRecipeListLoadCall] = useState({
    state: "pending",
  });

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
            <RecipeSiteInfo recipeSite={recipeListLoadCall.data} />
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

  useEffect(() => {
    fetch(`http://localhost:8000/recipe/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipeListLoadCall({ state: "error", error: responseJson });
      } else {
        setRecipeListLoadCall({ state: "success", data: responseJson });
      }
    });
  }, []);

  return <div className="App">{getChild()}</div>;
}

export default App;
