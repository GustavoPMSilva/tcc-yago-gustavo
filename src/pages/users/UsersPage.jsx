import React, { useEffect, useState } from "react";
import { useApi } from "../../contexts/ApiContext";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  Grid,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function UsersPage() {
  const { user, apiGet, apiPut } = useApi();
  const history = useHistory();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    apiGet("users", (data) => {
      console.log(data);
      setUserList(data);
    });
  }, []);

  function goToInviteUser() {
    history.push("/invite");
  }

  function activateUser(user) {
    user.status = "ACTIVE";
    updateUser(user);
  }

  function deactivateUser(user) {
    user.status = "INACTIVE";
    updateUser(user);
  }

  function updateUser(user) {
    apiPut(`user/${user.id}`, user, () => {
      //window.location.reload();
    });
  }

  return (
    <Container component="article">
      <Typography variant="h3" component="h1" align="center">
        Usuários
      </Typography>
      <List>
        {userList.map((u) => (
          <ListItem key={u.id} disableGutters>
            <Grid container spacing={1}>
              <Grid item xs>
                <Link to={`/user/${u.id}`}>{u.name}</Link>
              </Grid>
              <Grid item alignItems="stretch" style={{ display: "flex" }}>
                {u.id !== user.id ? (
                  u.status === "ACTIVE" ? (
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#eb2915" }}
                      onClick={(event) => {
                        deactivateUser(u);
                      }}
                    >
                      Desativar
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#5AAF4B" }}
                      onClick={(event) => {
                        activateUser(u);
                      }}
                    >
                      Ativar
                    </Button>
                  )
                ) : (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </Grid>
            </Grid>
          </ListItem>
        ))}
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={goToInviteUser}
          fullWidth
        >
          Convidar
        </Button>
      </List>
    </Container>
  );
}

export default UsersPage;
