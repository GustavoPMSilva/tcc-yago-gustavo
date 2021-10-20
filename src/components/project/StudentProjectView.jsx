import React, { useState } from "react";
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { GpfTextField } from "../core";
import { useApi } from "../../contexts/ApiContext";
import { ProjectStatus } from "../../models/project";

function StudentProjectView({ project }) {
  const { apiPut } = useApi();
  const [title, setTitle] = useState(project.title);
  const [subject, setSubject] = useState(project.subject);
  const [description, setDescription] = useState(project.description);
  const [keywords, setKeywords] = useState(project.keywords);
  const [file, setFile] = useState(project.file);

  function saveChanges() {
    project.title = title;
    project.subject = subject;
    project.description = description;
    project.keywords = keywords;
    project.file = file;

    apiPut(`project/${project.id}`, project, () => {
      window.location.reload();
    });
  }

  function sendToReview() {
    apiPut(`project/${project.id}/review`, null, () => {
      window.location.reload();
    });
  }

  function showUserList() {
    return (
      <>
        <Typography variant="h3" component="h1" align="center">
          Participantes
        </Typography>
        <List>
          {project.userList.map((u) => (
            <ListItem key={u.id} disableGutters>
              <ListItemText primary={u.name} />
            </ListItem>
          ))}
        </List>
      </>
    );
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
        {project.status === "IN_PROGRESS" ? (
          <GpfTextField
            id="file"
            label="Link para o documento do projeto"
            value={file ? file : ""}
            onChange={setFile}
            showButton={
              project.fileStatus != null && project.fileStatus === "REVIEWED"
            }
            endButton="Mandar para revisão"
            onEndButtonClicked={sendToReview}
          />
        ) : (
          <></>
        )}
        <Typography variant="body1">
          Status: {ProjectStatus[project.status]}
        </Typography>
        <Typography variant="body1">
          Criado em: {project.registerDate}
        </Typography>
        <br />
        <Button
          variant="contained"
          style={{ backgroundColor: "#5AAF4B" }}
          type="submit"
          fullWidth
        >
          Salvar
        </Button>
      </form>
      <br />
      {showUserList()}
    </>
  );
}

export default StudentProjectView;
