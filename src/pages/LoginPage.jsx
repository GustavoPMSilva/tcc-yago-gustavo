import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Typography } from "@material-ui/core";
import LoginForm from "../components/LoginForm";
import { useApi } from "../contexts/ApiContext";
import { useEffect } from "react";
import { ForgotPasswordDialog } from "../components/forgotpassworddialog";

function LoginPage() {
  const { signed, login, apiPost } = useApi();
  let history = useHistory();
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (email) => {
    setOpen(false);
    if (email != null) sendRecoveryPasswordEmail(email);
  };

  function sendRecoveryPasswordEmail(email) {
    apiPost("public/user/forgotpassword", { email });
  }

  useEffect(() => {
    if (signed) {
      history.push("/");
    }
  }, []);

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
      <br />
      <Button onClick={handleClickOpen}>Esqueci minha senha</Button>
      <ForgotPasswordDialog open={open} handleClose={handleClose} />
    </Container>
  );
}

export default LoginPage;
