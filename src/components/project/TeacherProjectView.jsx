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
  const [file, setFile] = useState(project.file);
  const [presentationDate, setPresentationDate] = useState(
    project.record ? project.record.thesisDate : null
  );
  const [presentationTime, setPresentationTime] = useState(
    project.record ? project.record.beginTime : null
  );
  const [presentationLocation, setPresentationLocation] = useState(
    project.record ? project.record.location : null
  );

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
    if (del) deleteProject();
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

  function deleteProject() {
    apiDelete(`project/${project.id}`, () => {
      history.push("/");
    });
  }

  function markAsReviewed() {
    apiPut(`project/${project.id}/reviewed`, null, () => {
      window.location.reload();
    });
  }

  function saveChanges() {
    project.title = title;
    project.subject = subject;
    project.description = description;
    project.status = status;
    project.keywords = keywords;
    project.file = file;
    if (status === "TO_BE_PRESENTED") {
      project.record = {
        thesisDate: presentationDate,
        beginTime:
          presentationTime.split(":").length > 2
            ? presentationTime
            : presentationTime + ":00",
        location: presentationLocation,
      };
    }

    console.log(project);

    apiPut(`project/${project.id}`, project, undefined, (error) => {
      window.location.reload();
    });
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
            <ListItem key={u.id} disableGutters>
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
            <ListItem disableGutters>
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

  function showSchedulePresentationFields() {
    if (status === "TO_BE_PRESENTED") {
      return (
        <>
          <GpfTextField
            id="presentation_date"
            label="Data da defesa"
            value={presentationDate}
            onChange={setPresentationDate}
            type="date"
            shrinkLabel
            required
          />
          <GpfTextField
            id="presentation_time"
            label="Hora da defesa"
            value={presentationTime}
            onChange={setPresentationTime}
            type="time"
            shrinkLabel
            required
          />
          <GpfTextField
            id="presentation_location"
            label="Local da defesa"
            value={presentationLocation}
            onChange={setPresentationLocation}
          />
        </>
      );
    }
  }

  function showRecordButton() {
    var projectUser = project.userList.find((u) => {
      return u.id === user.id;
    });

    if (
      !projectUser.committee &&
      !projectUser.coop &&
      project.status === "TO_BE_PRESENTED"
    ) {
      return (
        <>
          <Button
            variant="contained"
            style={{ backgroundColor: "#d9ba21" }}
            type="submit"
            fullWidth
          >
            Gerar ata
          </Button>
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
        {showSchedulePresentationFields()}
        <GpfTextField
          id="keywords"
          label="Palavras-chave"
          value={keywords}
          onChange={setKeywords}
        />
        <GpfTextField
          id="file"
          label="Link para o documento do projeto"
          value={file ? file : ""}
          onChange={setFile}
          showButton={
            project.status === "IN_PROGRESS" &&
            project.fileStatus != null &&
            project.fileStatus === "IN_REVIEW"
          }
          endButton="Revisado"
          onEndButtonClicked={markAsReviewed}
        />
        <br />
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
      {showRecordButton()}
      <br />
      <br />
      {showUserList()}
      <br />
      {showDeleteProjectButton()}
      <br />
      <br />
      <br />
    </>
  );
}

export default TeacherProjectView;
