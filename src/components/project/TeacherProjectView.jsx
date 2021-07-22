import React, { useState } from "react";
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { GpfSelect, GpfTextField } from "../core";
import { ProjectStatus } from "../../models/project";
import DeleteIcon from "@material-ui/icons/Delete";
import { useApi } from "../../contexts/ApiContext";
import { AddParticipantToProject } from "../addparticipanttoproject";

function TeacherProjectView({ project }) {
  const { user, apiPut } = useApi();
  const [title, setTitle] = useState(project.title);
  const [subject, setSubject] = useState(project.subject);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);
  const [keywords, setKeywords] = useState(project.keywords);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (selectedId) => {
    setOpen(false);
    if (selectedId != null) window.location.reload();
  };

  function saveChanges() {
    project.title = title;
    project.subject = subject;
    project.description = description;
    project.status = status;
    project.keywords = keywords;

    apiPut(`project/${project.id}`, project);
  }

  function showUserList() {
    var projectUser = project.userList.find((u) => {
      return u.id === user.id;
    });

    return (
      <>
        <Typography variant="h3" component="h1" align="center">
          Participantes
        </Typography>
        <List>
          {project.userList.map((u) => (
            <ListItem key={u.id}>
              <ListItemText primary={u.name} />
              {!projectUser.committee &&
              !projectUser.coop &&
              u.id !== projectUser.id ? (
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              ) : (
                <></>
              )}
            </ListItem>
          ))}
          {!projectUser.committee && !projectUser.coop ? (
            <ListItem>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClickOpen}
                fullWidth
              >
                Adicionar
              </Button>
              <AddParticipantToProject
                open={open}
                handleClose={handleClose}
                currentUserList={project.userList.map((u) => u.id)}
              />
            </ListItem>
          ) : (
            <></>
          )}
        </List>
      </>
    );
  }

  return (
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
      <GpfSelect
        id="status"
        label="Estado"
        options={ProjectStatus}
        value={status}
        onChange={setStatus}
        required
      />
      <GpfTextField
        id="keywords"
        label="Palavras-chave"
        value={keywords}
        onChange={setKeywords}
      />
      <Typography variant="body1">Criado em: {project.registerDate}</Typography>
      {showUserList()}
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Salvar
      </Button>
    </form>
  );
}

export default TeacherProjectView;
