import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import UserForm from "../../components/UserForm";
import { useApi } from "../../contexts/ApiContext";

function ProfilePage() {
  const { user, apiGet, apiPut } = useApi();
  const [backendUser, setBackendUser] = useState();

  function save(updatedUser) {
    apiPut(`user/${updatedUser.id}`, updatedUser, onSaveSuccess);
  }

  function onSaveSuccess() {
    window.location.reload();
  }

  useEffect(() => {
    function onUserLoaded(data) {
      setBackendUser(data);
    }

    apiGet(`user/${user.id}`, onUserLoaded);
  }, []);

  return (
    <Container component="article">
      <Typography variant="h3" component="h1" align="center">
        Perfil
      </Typography>
      {backendUser ? (
        <UserForm user={backendUser} buttonText="Salvar" onSubmit={save} />
      ) : (
        <p>Loading</p>
      )}
    </Container>
  );
}

export default ProfilePage;
