import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
  },
});

function NavHeader() {
  const { signed, user, logout } = useAuth();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function doLogout() {
    logout(onLogout);
  }

  function onLogout() {
    history.push("/");
  }

  function showLoginLink() {
    if (!signed) {
      return (
        <div>
          <Link to="/login">Login</Link>
        </div>
      );
    }
  }

  function showInviteLink() {
    if (signed && user.userType === "TEACHER") {
      return (
        <div>
          <Link to="/invite">Convidar</Link>
        </div>
      );
    }
  }

  function showLogoutButton() {
    if (signed) {
      return (
        <Button variant="contained" color="primary" onClick={doLogout}>
          Sair
        </Button>
      );
    }
  }

  return (
    <nav>
      <div className="logo">GeProFi</div>
      <div>
        <Link to="/">Home</Link>
      </div>
      {showLoginLink()}
      {showInviteLink()}
      <div>
        <ThemeProvider theme={theme}>
          <Button color="primary" onClick={handleClick}>
            Área Pública
          </Button>
        </ThemeProvider>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/public/fields">Áreas de Interesse</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/public/projects">Projetos Concluídos</Link>
          </MenuItem>
        </Menu>
      </div>
      {showLogoutButton()}
    </nav>
  );
}

export default NavHeader;
