import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Icon from "@mdi/react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import { mdiLoading } from "@mdi/js";
import CreateRecipe from "./components/CreateRecipeModal/CreateRecipe";
import LoginToggle from "./components/LogginToggle/LoginToggle";
import { useUser, roles } from "./UserProvider";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [recipeListLoadCall, setRecipeListLoadCall] = useState({
    state: "pending",
  });

  const [showModal, setShowModal] = useState(false);

  let navigate = useNavigate();

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const { currentUser } = useUser();

  function getRecipeListDropdown() {
    switch (recipeListLoadCall.state) {
      case "pending":
        return (
          <Nav.Link disabled={true}>
            <Icon size={1} path={mdiLoading} spin={true} /> Seznam receptů
          </Nav.Link>
        );
      case "success":
        return (
          <NavDropdown title="Select recept" id="navbarScrollingDropdown">
            {recipeListLoadCall.data.map((recipe) => (
              <NavDropdown.Item
                key={recipe.id}
                onClick={() => navigate(`/recipeDetail?id=${recipe.id}`)}
              >
                {recipe.name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
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

  const fetchRecipes = () => {
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
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="App">
      <Navbar
        fixed="top"
        expand={"sm"}
        className="mb-3"
        bg="dark"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>
            Chutně a rychle
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Chutně a rychle
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {currentUser.role === roles.ADMIN && (
                  <Nav.Link onClick={handleShowModal}>Vytvořit recept</Nav.Link>
                )}
                <CreateRecipe
                  show={showModal}
                  handleClose={handleCloseModal}
                  fetchRecipes={fetchRecipes}
                  onSaveSuccess={handleCloseModal}
                />
                {currentUser.role === roles.ADMIN ||
                currentUser.role === roles.USER ? (
                  <>
                    <Nav.Link onClick={() => navigate("/recipeList")}>
                      Recepty
                    </Nav.Link>
                    {getRecipeListDropdown()}
                  </>
                ) : null}
                {currentUser.role === roles.ADMIN ||
                currentUser.role === roles.USER ? (
                  <Nav.Link onClick={() => navigate("/ingridientList")}>
                    Ingredience
                  </Nav.Link>
                ) : null}
                <LoginToggle />
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
}

export default App;
