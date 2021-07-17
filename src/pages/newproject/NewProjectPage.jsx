import React, { useState } from "react";
import { Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { GpfTextField } from "../../components/core";
import { apiPost } from "../../service/api";
import { Container, Typography } from "@material-ui/core";
import { useHistory } from "react-router";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NewProjectPage() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  function onChangesSaved(id) {
    setOpen(true);

    history.push(`/project/${id}`);
  }

  function saveChanges() {
    var project = {
      title: title,
      subject: subject,
      description: description,
      keywords: keywords,
    };

    apiPost(`project/`, project, onChangesSaved);
  }

  return (
    <Container component="article">
      <Typography variant="h3" component="h1" align="center">
        Novo Projeto
      </Typography>
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
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Criar
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Projeto criado com sucesso
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default NewProjectPage;
