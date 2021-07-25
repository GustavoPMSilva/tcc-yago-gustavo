import React, { useState, useEffect } from "react";
import { useApi } from "../../contexts/ApiContext";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import UserForm from "../../components/UserForm";
import { AddFieldOfInterestToUser } from "../../components/appfieldofinteresttouser";

function ProfilePage() {
  const { user, apiGet, apiPost, apiPut, apiDelete } = useApi();
  const [userData, setUserData] = useState();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (data) => {
    setOpen(false);
    if (data != null) addFieldOfInterestToUser(data.field);
  };

  function addFieldOfInterestToUser(field) {
    console.log(field);
    var url =
      field.id === null
        ? `field/new/user/${userData.id}`
        : `field/${field.id}/user/${userData.id}`;

    apiPost(url, field, () => {
      window.location.reload();
    });
  }

  function removeFieldOfInterestFromUser(field) {
    apiDelete(`field/${field.id}/user/${userData.id}`, () => {
      window.location.reload();
    });
  }

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

  function showFieldOfInterestList() {
    if (userData.userType === "TEACHER") {
      return (
        <>
          <Typography variant="h3" component="h1" align="center">
            Áreas de Interesse
          </Typography>
          <List>
            {userData.fieldOfInterestList.map((f) => (
              <ListItem key={f.id}>
                <ListItemText primary={f.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={(event) => {
                      event.preventDefault();
                      removeFieldOfInterestFromUser(f);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
            fullWidth
          >
            Adicionar
          </Button>
          <AddFieldOfInterestToUser
            open={open}
            handleClose={handleClose}
            currentFieldOfInterestList={userData.fieldOfInterestList.map(
              (f) => f.id
            )}
          />
          <br />
          <br />
        </>
      );
    }
  }

  return (
    <Container component="article">
      <Typography variant="h3" component="h1" align="center">
        Perfil
      </Typography>
      {userData ? (
        <>
          <UserForm user={userData} buttonText="Salvar" onSubmit={save} />
          <br />
          {showFieldOfInterestList()}
        </>
      ) : (
        <p>Loading</p>
      )}
    </Container>
  );
}

export default ProfilePage;
