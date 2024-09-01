import React from "react";
import { useUser, roles, users } from "../../UserProvider";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function LoginToggle() {
  const { currentUser, login, logout } = useUser();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    const user = users.find((u) => u.role === role);
    if (user) {
      login(user.id);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("");
  };

  return (
    <div className="d-flex align-items-center gap-3">
      {currentUser.role === roles.GUEST ? (
        <>
          <Button
            variant="outline-light"
            onClick={() => handleLogin(roles.USER)}
            className="btn-sm"
          >
            Přihlášení jako uživatel
          </Button>
          <Button
            variant="outline-light"
            onClick={() => handleLogin(roles.ADMIN)}
            className="btn-sm"
          >
            Přihlášení jako správce
          </Button>
        </>
      ) : (
        <Button
          variant="outline-danger"
          onClick={handleLogout}
          className="btn-sm"
        >
          Odhlášení
        </Button>
      )}
      <span className="text-light">{`Přihlášen jako: ${currentUser.fullName}`}</span>
    </div>
  );
}

export default LoginToggle;
