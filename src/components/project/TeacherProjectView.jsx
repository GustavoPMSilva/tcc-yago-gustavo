import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
import { AlertDialog } from "../dialog";

function TeacherProjectView({ project }) {
  const { user, apiPost, apiPut, apiDelete } = useApi();
  let history = useHistory();
  const [title, setTitle] = useState(project.title);
  const [subject, setSubject] = useState(project.subject);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);
  const [keywords, setKeywords] = useState(project.keywords);

  const [openAddUser, setOpenAddUser] = useState(false);
  const [userToBeRemoved, setUserToBeRemoved] = useState(null);
  const [openDeleteProject, setOpenDeleteProject] = useState(false);

  const handleClickOpenAddUser = () => {
    setOpenAddUser(true);
  };

  const handleCloseAddUser = (data) => {
    setOpenAddUser(false);
    if (data != null) addUserToProject(data.user);
  };

  const handleClickOpenRemoveUser = (user) => {
    setUserToBeRemoved(user);
  };

  const handleCloseRemoveUser = (remove) => {
    if (remove) removeUserFromProject(userToBeRemoved);
    setUserToBeRemoved(null);
  };

  const handleClickOpenDeleteProject = () => {
    setOpenDeleteProject(true);
  };

  const handleCloseDeleteProject = (del) => {
    setOpenDeleteProject(false);
    if (del) deleteProject(project);
  };

  function addUserToProject(user) {
    console.log(user);
    let body = { committee: user.committee, coop: user.coop };
    apiPost(`project/${project.id}/user/${user.id}`, body, () => {
      window.location.reload();
    });
  }

  function removeUserFromProject(user) {
    apiDelete(`project/${project.id}/user/${user.id}`, () => {
      window.location.reload();
    });
  }

  function deleteProject(project) {
    apiDelete(`project/${project.id}`, () => {
      history.push("/");
    });
  }

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
                  <IconButton
                    edge="end"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClickOpenRemoveUser(u);
                    }}
                  >
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
                color="primary"
                onClick={handleClickOpenAddUser}
                fullWidth
              >
                Adicionar
              </Button>
              <AddParticipantToProject
                open={openAddUser}
                handleClose={handleCloseAddUser}
                currentUserList={project.userList.map((u) => u.id)}
              />
            </ListItem>
          ) : (
            <></>
          )}
        </List>
        <AlertDialog
          open={userToBeRemoved != null}
          handleClose={handleCloseRemoveUser}
          title="Remover usuário do projeto"
          body={
            userToBeRemoved == null
              ? ""
              : `Tem certeza que deseja remover ${userToBeRemoved.name} do projeto?`
          }
        />
      </>
    );
  }

  function showDeleteProjectButton() {
    var projectUser = project.userList.find((u) => {
      return u.id === user.id;
    });

    if (!projectUser.committee && !projectUser.coop) {
      return (
        <>
          <Button
            variant="contained"
            style={{ backgroundColor: "#eb2915" }}
            onClick={(event) => {
              event.stopPropagation();
              handleClickOpenDeleteProject();
            }}
            fullWidth
          >
            Excluir
          </Button>
          <AlertDialog
            open={openDeleteProject}
            handleClose={handleCloseDeleteProject}
            title="Excluir projeto"
            body={`Tem certeza que deseja excluir o projeto ${title}? Essa ação não poderá ser desfeita.`}
          />
        </>
      );
    }
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
        <Typography variant="body1">
          Criado em: {project.registerDate}
        </Typography>
        {showUserList()}
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
      <br />
      <br />
      {showDeleteProjectButton()}
      <br />
      <br />
      <br />
    </>
  );
}

export default TeacherProjectView;
