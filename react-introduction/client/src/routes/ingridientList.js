import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import IngredientsList from "../components/IngredientList/IngredientList";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import "bootstrap/dist/css/bootstrap.min.css";

function IngredientListRoute() {
  const [ingredientListState, setIngredientListState] = useState({
    state: "pending",
  });
  let [searchParams] = useSearchParams();
  const ingredientId = searchParams.get("id");

  useEffect(() => {
    setIngredientListState({ state: "pending" });
    fetch("http://localhost:3000/ingredient/list", { method: "GET" }).then(
      async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
          setIngredientListState({ state: "error", error: responseJson });
        } else {
          const ingredientIds = responseJson.map((ingredient) => ingredient.id);
          setIngredientListState({ state: "success", data: ingredientIds });
        }
      }
    );
  }, [ingredientId]);

  function getChild() {
    switch (ingredientListState.state) {
      case "pending":
        return (
          <div className="loading">
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
      case "success":
        return <IngredientsList ingredientIds={ingredientListState.data} />;
      case "error":
        return (
          <div className="error">
            <div>Failed to load ingredient data.</div> <br />
            <pre>{JSON.stringify(ingredientListState.error, null, 2)}</pre>
          </div>
        );
      default:
        return null;
    }
  }
  return getChild();
}
export default IngredientListRoute;
