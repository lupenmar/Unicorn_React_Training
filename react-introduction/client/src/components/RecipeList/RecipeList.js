import React, { useState, useMemo } from "react";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import RecipeGridList from "../RecipeGridList/RecipeGridList";
import RecipeTableList from "../RecipeTableList/RecipeTableList";
import SearchBar from "../filter/SearchBar/SearchBar";
import CategoryFilter from "../filter/CategoryFilter/CategoryFilter";
import ViewToggle from "../filter/ViewToggle/ViewToggle";
import "../RecipeList/RecipeList.css";

function RecipeList(props) {
  const [viewType, setViewType] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const isGrid = viewType === "grid";
  const [searchBy, setSearchBy] = useState("");

  const filteredRecipeList = useMemo(() => {
    if (!Array.isArray(props.recipeList)) return [];
    return props.recipeList.filter((item) => {
      return (
        (item.name.toLowerCase().includes(searchBy.toLowerCase()) ||
          item.description.toLowerCase().includes(searchBy.toLowerCase())) &&
        (selectedCategory === "All" || item.category === selectedCategory)
      );
    });
  }, [searchBy, selectedCategory, props.recipeList]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
  }

  return (
    <div>
      <Navbar bg="light">
        <div className="container-fluid d-flex">
          <Navbar.Brand>Seznam receptu</Navbar.Brand>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={(e) => setSelectedCategory(e.target.value)}
          />
          <SearchBar
            className="searchInput"
            onSearchChange={handleSearchDelete}
            onSearchSubmit={handleSearch}
          />
          <ViewToggle
            isGrid={isGrid}
            onToggleView={() =>
              setViewType((currentState) =>
                currentState === "grid" ? "table" : "grid"
              )
            }
          />
        </div>
      </Navbar>
      {isGrid ? (
        <RecipeGridList recipeList={filteredRecipeList} />
      ) : (
        <RecipeTableList recipeList={filteredRecipeList} />
      )}
    </div>
  );
}

export default RecipeList;
