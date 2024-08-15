import React from "react";
import { Form } from "react-bootstrap";

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <Form.Control
      as="select"
      value={selectedCategory}
      onChange={onCategoryChange}
      style={{ maxWidth: "200px" }}
    >
      <option value="All">Všechny kategorie</option>
      <option value="Breakfast">Snídaně</option>
      <option value="Lunch">Oběd</option>
      <option value="Dinner">Večeře</option>
    </Form.Control>
  );
}
export default CategoryFilter;
