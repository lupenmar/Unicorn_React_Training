import React from "react";
import Table from "react-bootstrap/Table";
import "./RecipeTableList.css";

function RecipeTableList(props) {
  return (
    <Table bordered hover className="recipe-table">
      <thead>
        <tr>
          <th className="text-center">Název</th>
          <th className="text-center">Popis</th>
        </tr>
      </thead>
      <tbody>
        {props.recipeList.map((recipe) => {
          return (
            <tr key={recipe.id}>
              <td>
                <p className="name">{recipe.name}</p>
              </td>
              <td>{recipe.description}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default RecipeTableList;
