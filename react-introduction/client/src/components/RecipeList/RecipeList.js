import React, { useState, useMemo } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import RecipeGridList from "../RecipeGridList/RecipeGridList";
import RecipeTableList from "../RecipeTableList/RecipeTableList";
import Form from "react-bootstrap/Form";
import "../RecipeList/RecipeList.css";

import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline, mdiMagnify } from "@mdi/js";

function RecipeList(props) {
  const [viewType, setViewType] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const isGrid = viewType === "grid";
  const [searchBy, setSearchBy] = useState("");

  const filteredRecipeList = useMemo(() => {
    return props.recipeList.filter((item) => {
      return (
        (item.name.toLowerCase().includes(searchBy.toLowerCase()) ||
          item.description.toLowerCase().includes(searchBy.toLowerCase())) &&
        (selectedCategory === "All" || item.category === selectedCategory)
      );
    });
  }, [searchBy, selectedCategory]);

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
        <div className="container-fluid">
          <Navbar.Brand>Seznam receptu</Navbar.Brand>
          <div>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                as="select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">Všechny kategorie</option>
                <option value="Breakfast">Snídaně</option>
                <option value="Lunch">Oběd</option>
                <option value="Dinner">Večeře</option>
              </Form.Control>
              <Form.Control
                id={"searchInput"}
                style={{ maxWidth: "150px" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchDelete}
              />
              <Button
                style={{ marginRight: "8px" }}
                variant="outline-success"
                type="submit"
              >
                <Icon size={1} path={mdiMagnify} />
              </Button>
              <Button
                variant="outline-primary"
                onClick={() =>
                  setViewType((currentState) => {
                    if (currentState === "grid") return "table";
                    else return "grid";
                  })
                }
              >
                <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}
                {isGrid ? "Tabulka" : "Grid"}
              </Button>
            </Form>
          </div>
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
