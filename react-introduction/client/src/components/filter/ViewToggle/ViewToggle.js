import React from "react";
import { Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline } from "@mdi/js";

function ViewToggle({ isGrid, onToggleView }) {
  return (
    <Button variant="outline-primary" onClick={onToggleView}>
      <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />
      {isGrid ? "Tabulka" : "Grid"}
    </Button>
  );
}

export default ViewToggle;
