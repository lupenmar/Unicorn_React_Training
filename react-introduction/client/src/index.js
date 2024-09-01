import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import IngredientListRoute from "./routes/ingridientList";
import RecipeList from "./routes/recipeList";
import RecipeDetail from "./routes/RecipeDetail/recipeDetail";
import Home from "./routes/Home/home";
import { UserProvider } from "./UserProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="recipeDetail" element={<RecipeDetail />} />
            <Route path="recipeList" element={<RecipeList />} />
            <Route path="ingridientList" element={<IngredientListRoute />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();