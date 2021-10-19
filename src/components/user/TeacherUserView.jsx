import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useApi } from "../../contexts/ApiContext";

function TeacherUserView({ user }) {
  const { apiGet } = useApi();
  const [fieldOfInterestList, setFieldOfInterestList] = useState([]);

  useEffect(() => {
    function onFieldOfInterestListLoaded(data) {
      setFieldOfInterestList(data);
    }

    apiGet("user/fields", onFieldOfInterestListLoaded, undefined);
  }, []);

  function showFieldOfInterestList() {
    if (user.userType === "TEACHER") {
      return (
        <>
          <Typography variant="h4" component="h1" align="center">
            Áreas de Interesse
          </Typography>
          <List>
            {fieldOfInterestList.map((f) => (
              <ListItem
                key={f.id}
                component={Link}
                to={`/field/${f.id}`}
                disableGutters
              >
                <ListItemText primary={f.name} />
              </ListItem>
            ))}
          </List>
          <br />
          <br />
        </>
      );
    }
  }

  return (
    <Container component="article">
      <Typography variant="h3" component="h1" align="center">
        {user.name}
      </Typography>
      <Typography variant="h4" component="h1" align="center">
        {user.origin}
      </Typography>
      <br />
      <Typography variant="h5" component="h1">
        Email: {user.email}
      </Typography>
      <br />
      <Typography variant="h5" component="h1">
        Título: {user.title}
      </Typography>
      <br />
      <Typography variant="h5" component="h1">
        Cargo: {user.position}
      </Typography>
      <br />
      <Typography variant="h5" component="h1">
        Sala: {user.room}
      </Typography>
      <br />
      <Typography variant="h5" component="h1">
        Lattes:&nbsp;
        <a href={user.lattes} taget="_blank" rel="noreferrer">
          {user.lattes}
        </a>
      </Typography>
      <br />
      <Typography variant="h5" component="h1">
        Página pessoal:&nbsp;
        <a href={user.lattes} taget="_blank" rel="noreferrer">
          {user.userProfile}
        </a>
      </Typography>
      <br />
      {showFieldOfInterestList()}
    </Container>
  );
}

export default TeacherUserView;
