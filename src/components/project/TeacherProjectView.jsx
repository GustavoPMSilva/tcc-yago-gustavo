import React from "react";
import { useState } from "react";
import { TextField, Button } from "@material-ui/core";

function TeacherProjectView({ project }) {
  const [title, setTitle] = useState(project.title);
  const [subject, setSubject] = useState(project.subject);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);
  const [registerDate, setRegisterDate] = useState(project.registerDate);
  const [keywords, setKeywords] = useState(project.keywords);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <TextField
        id="title"
        name="title"
        label="Título"
        variant="outlined"
        margin="normal"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        required
        fullWidth
      />
      <TextField
        id="subject"
        name="subject"
        label="Assunto"
        variant="outlined"
        margin="normal"
        value={subject}
        onChange={(event) => {
          setSubject(event.target.value);
        }}
        required
        fullWidth
      />
      <TextField
        id="description"
        name="description"
        label="Descrição"
        variant="outlined"
        margin="normal"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
        required
        fullWidth
      />
      <TextField
        id="status"
        name="status"
        label="Estado"
        variant="outlined"
        margin="normal"
        value={status}
        onChange={(event) => {
          setStatus(event.target.value);
        }}
        required
        fullWidth
      />
      <TextField
        id="registerDate"
        name="registerDate"
        label="Criado em"
        variant="outlined"
        margin="normal"
        value={registerDate}
        onChange={(event) => {
          setRegisterDate(event.target.value);
        }}
        required
        fullWidth
      />
      <TextField
        id="keywords"
        name="keywords"
        label="Palavras-chave"
        variant="outlined"
        margin="normal"
        value={keywords}
        onChange={(event) => {
          setKeywords(event.target.value);
        }}
        required
        fullWidth
      />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Salvar
      </Button>
    </form>
  );
}

export default TeacherProjectView;
