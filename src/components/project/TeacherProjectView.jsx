import React from "react";
import { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { apiPut } from "../../service/api";

function TeacherProjectView({ project }) {
  const [title, setTitle] = useState(project.title);
  const [subject, setSubject] = useState(project.subject);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);
  const [keywords, setKeywords] = useState(project.keywords);

  function onChangesSaved() {
    window.location.reload();
  }

  function saveChanges() {
    project.title = title;
    project.subject = subject;
    project.description = description;
    project.status = status;
    project.keywords = keywords;

    apiPut(`project/${project.id}`, project, onChangesSaved);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        saveChanges();
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
          event.stopPropagation();
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
          event.stopPropagation();
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
          event.stopPropagation();
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
          event.stopPropagation();
          setStatus(event.target.value);
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
          event.stopPropagation();
          setKeywords(event.target.value);
        }}
        required
        fullWidth
      />
      <Typography variant="body1">Criado em: {project.registerDate}</Typography>
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Salvar
      </Button>
    </form>
  );
}

export default TeacherProjectView;
