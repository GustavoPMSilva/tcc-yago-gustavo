import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import LoginForm from "../components/LoginForm";
import { useApi } from "../contexts/ApiContext";
import { useEffect } from "react";

function LoginPage() {
  const { signed, login } = useApi();
  let history = useHistory();
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    if (signed) {
      history.push("/");
    }
  });

  function onLoginSuccess() {
    history.push("/");
  }

  function onLoginFail() {
    setError(true);
    setHelperText("Email ou senha inválidos");
  }

  function doLogin(email, password) {
    setError(false);
    setHelperText("");
    login(email, password, onLoginSuccess, onLoginFail);
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
