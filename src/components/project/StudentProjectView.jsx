import React, { useState } from "react";
import { Typography, Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { GpfTextField } from "../core";
import { apiPut } from "../../service/api";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function StudentProjectView({ project }) {
  const [title, setTitle] = useState(project.title);
  const [subject, setSubject] = useState(project.subject);
  const [description, setDescription] = useState(project.description);
  const [keywords, setKeywords] = useState(project.keywords);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  function onChangesSaved() {
    setOpen(true);
  }

  function saveChanges() {
    project.title = title;
    project.subject = subject;
    project.description = description;
    project.keywords = keywords;

    apiPut(`project/${project.id}`, project, onChangesSaved);
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          saveChanges();
        }}
      >
        <GpfTextField
          id="title"
          label="Título"
          value={title}
          onChange={setTitle}
          required
        />
        <GpfTextField
          id="subject"
          label="Tema"
          value={subject}
          onChange={setSubject}
          required
        />
        <GpfTextField
          id="description"
          label="Resumo"
          value={description}
          onChange={setDescription}
          rows={10}
        />
        <GpfTextField
          id="keywords"
          label="Palavras-chave"
          value={keywords}
          onChange={setKeywords}
        />
        <Typography variant="body1">Status: {project.status}</Typography>
        <Typography variant="body1">
          Criado em: {project.registerDate}
        </Typography>
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Salvar
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Dados salvos com sucesso
        </Alert>
      </Snackbar>
    </>
  );
}

export default StudentProjectView;
