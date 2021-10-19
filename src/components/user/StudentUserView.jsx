import React from "react";
import { Container, Typography } from "@material-ui/core";

function StudentUserView({ user }) {
  return (
    <Container component="article">
      <Typography variant="h3" component="h1" align="center">
        {user.name}
      </Typography>
      <br />
      <Typography variant="h5" component="h1">
        Email: {user.email}
      </Typography>
      <Typography variant="h5" component="h1">
        Lattes:&nbsp;
        <a href={user.lattes} taget="_blank" rel="noreferrer">
          {user.lattes}
        </a>
      </Typography>
    </Container>
  );
}

export default StudentUserView;
