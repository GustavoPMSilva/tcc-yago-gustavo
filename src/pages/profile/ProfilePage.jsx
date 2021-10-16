import React, { useState, useEffect } from "react";
import { useApi } from "../../contexts/ApiContext";
import { Container, Typography } from "@material-ui/core";
import UserForm from "../../components/UserForm";

function ProfilePage() {
  const { user, apiGet, apiPut } = useApi();
  const [userData, setUserData] = useState();

  function save(updatedUser) {
    apiPut(`user/${updatedUser.id}`, updatedUser, onSaveSuccess);
  }

  function onSaveSuccess() {
    window.location.reload();
  }

  useEffect(() => {
    function onUserLoaded(data) {
      setUserData(data);
    }

    apiGet(`user/${user.id}`, onUserLoaded);
  }, []);

  return (
    <Container component="article">
      <Typography variant="h3" component="h1" align="center">
        Perfil
      </Typography>
      {userData ? (
        <>
          <UserForm user={userData} buttonText="Salvar" onSubmit={save} />
          <br />
        </>
      ) : (
        <p>Loading</p>
      )}
    </Container>
  );
}

export default ProfilePage;
