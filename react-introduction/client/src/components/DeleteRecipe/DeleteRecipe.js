import { useState } from "react";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import Confirmation from "../Confirmation/Confirmation";
import "./DeleteRecipe.css";

export default function DeleteRecipe({ recipe, onDelete, onError }) {
  const [deleteRecipeCall, setDeleteRecipeCall] = useState({
    state: "inactive",
  });

  const handleDelete = async () => {
    if (deleteRecipeCall.state === "pending") return;

    setDeleteRecipeCall({ state: "pending" });

    const res = await fetch(`http://localhost:3000/recipe/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: recipe.id }),
    });

    const data = await res.json();

    if (res.status >= 400) {
      setDeleteRecipeCall({ state: "error", error: data });

      if (typeof onError === "function") onError(data.errorMessage);
    } else {
      setDeleteRecipeCall({ state: "success", data });

      if (typeof onDelete === "function") {
        onDelete(recipe.id);
      }
    }
  };

  return (
    <Confirmation
      title="Smazat recept"
      message="Opravdu si přejete smazat recept?"
      confirmText="Smazat"
      onConfirm={handleDelete}
    >
      <div>
        <button className="delete-button">
          Smazat
          <Icon
            path={mdiTrashCanOutline}
            className="delete-icon"
            style={{ cursor: "pointer", color: "white" }}
            size={0.8}
          ></Icon>
        </button>
      </div>
    </Confirmation>
  );
}
