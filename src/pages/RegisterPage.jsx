import React, { useEffect, useState } from "react";
import { useQuery } from "../hooks/UseQuery";
import { apiGet, apiPut } from "../service/api";
import { Container, Typography } from "@material-ui/core";
import UserForm from "../components/UserForm";
import { useHistory } from "react-router-dom";

function RegisterPage() {
  const query = useQuery();
  const history = useHistory();
  const token = query.get("token");
  const [user, setUser] = useState();

  useEffect(() => {
    function onUserLoaded(userList) {
      setUser(userList[0]);
    }

    apiGet(`user?token=${token}`, onUserLoaded).catch(() => {
      history.push("/404");
    });
  }, [history, token, setUser]);

  function onSubmitDone() {
    history.push("/");
  }

  function doSubmit(updatedUser) {
    apiPut(`user/${updatedUser.id}`, updatedUser, onSubmitDone);
  }

  return (
    <Container component="article">
      <Typography variant="h3" component="h1" align="center">
        Registro
      </Typography>
      {user ? (
        <UserForm user={user} buttonText="Registrar" onSubmit={doSubmit} />
      ) : (
        <p>Loading</p>
      )}
    </Container>
  );
}

export default RegisterPage;