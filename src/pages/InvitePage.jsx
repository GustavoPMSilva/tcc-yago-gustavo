import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useApi } from "../contexts/ApiContext";

function InvitePage() {
  const { apiPost } = useApi();
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");

  function onInviteDone() {
    window.location.reload();
  }

  function doInvite() {
    const body = { email: email, userType: userType };
    apiPost("user", body, onInviteDone);
  }

  return (
    <Container component="article" maxWidth="sm">
      <Typography variant="h3" component="h1" align="center">
        Convidar
      </Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          doInvite();
        }}
      >
        <FormControl component="fieldset" required>
          <FormLabel component="legend">Tipo de usuário</FormLabel>
          <RadioGroup
            aria-label="userType"
            name="userType"
            value={userType}
            onChange={(event) => {
              event.stopPropagation();
              setUserType(event.target.value);
            }}
            row
          >
            <FormControlLabel
              value="EXTERNAL_TEACHER"
              control={<Radio color="primary" />}
              label="Professor externo"
            />
            <FormControlLabel
              value="STUDENT"
              control={<Radio color="primary" />}
              label="Estudante"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(event) => {
            event.stopPropagation();
            setEmail(event.target.value);
          }}
          required
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Convidar
        </Button>
      </form>
    </Container>
  );
}

export default InvitePage;
