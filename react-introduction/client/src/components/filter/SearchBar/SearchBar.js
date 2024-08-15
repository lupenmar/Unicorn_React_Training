import React from "react";
import { Form, Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";

function SearchBar({ onSearchChange, onSearchSubmit }) {
  return (
    <Form className="d-flex" onSubmit={onSearchSubmit}>
      <Form.Control
        id="searchInput"
        type="search"
        placeholder="Vyhledávání"
        aria-label="Search"
        onChange={onSearchChange}
      />
      <Button variant="outline-success" type="submit">
        <Icon size={1} path={mdiMagnify} />
      </Button>
    </Form>
  );
}
export default SearchBar;
