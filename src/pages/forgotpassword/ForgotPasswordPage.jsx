import React, { useEffect, useState } from "react";
import { useQuery } from "../../hooks/UseQuery";
import { useApi } from "../../contexts/ApiContext";
import { useHistory } from "react-router-dom";
import { Container, Typography, Button } from "@material-ui/core";
import GpfTextField from "../../components/core/GpfTextfield";

function ForgotPasswordPage() {
  const { apiGet, apiPut } = useApi();
  const query = useQuery();
  const history = useHistory();
  const token = query.get("token");
  const [user, setUser] = useState();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    function onUserLoaded(userList) {
      setUser(userList[0]);
    }

    function onError(error) {
      history.push("/404");
    }

    apiGet(`public/user?token=${token}`, onUserLoaded, onError);
  }, []);

  function onSubmitDone() {
    history.push("/");
  }

  function doSubmit(updatedUser) {
    apiPut(`public/user/${updatedUser.id}`, updatedUser, onSubmitDone);
  }

  return (
    <Container component="article">
      <Typography variant="h3" component="h1" align="center">
        Nova Senha
      </Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          user.password = password;
          doSubmit(user);
        }}
      >
        <GpfTextField
          id="password"
          label={"Nova senha"}
          type="password"
          value={password}
          onChange={setPassword}
          required
          error={error}
          helperText={helperText}
        />
        <GpfTextField
          id="password_confirmation"
          label={"Confirmar nova senha"}
          type="password"
          value={passwordConfirmation}
          onChange={(value) => {
            setPasswordConfirmation(value);
            setError(password !== value);
            setHelperText(password !== value ? "Senhas não são iguais" : "");
          }}
          required
          error={error}
          helperText={helperText}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={error}
        >
          Alterar senha
        </Button>
      </form>
      <br />
      <br />
    </Container>
  );
}

export default ForgotPasswordPage;
