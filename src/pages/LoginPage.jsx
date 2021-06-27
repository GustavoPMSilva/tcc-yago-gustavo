import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const { signed, login } = useAuth();
  let history = useHistory();
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  if (signed) {
    history.push("/");
  }

  function doLogin(email, password) {
    setError(false);
    setHelperText("");
    login(email, password).catch(() => {
      setError(true);
      setHelperText("Email ou senha inválidos");
    });
  }

  return (
    <Container component="article" maxWidth="sm">
      <Typography variant="h3" component="h1" align="center">
        Login
      </Typography>
      <LoginForm
        onSubmitClicked={doLogin}
        error={error}
        helperText={helperText}
      />
    </Container>
  );
}

export default LoginPage;
