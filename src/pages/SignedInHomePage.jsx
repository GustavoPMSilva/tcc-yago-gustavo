import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  TableContainer,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Table,
  TableHead,
  Typography,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useApi } from "../contexts/ApiContext";
import { AddFieldOfInterestToUser } from "../components/appfieldofinteresttouser";
import { AlertDialog } from "../components/dialog";

function SignedInHomePage() {
  const { apiGet, apiPost, apiDelete } = useApi();
  const { user } = useApi();
  const history = useHistory();
  const [projectsList, setProjectsList] = useState([]);
  const [fieldOfInterestList, setFieldOfInterestList] = useState([]);
  const [fieldOfInterestToBeRemoved, setFieldOfInterestToBeRemoved] =
    useState(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (data) => {
    setOpen(false);
    if (data != null) addFieldOfInterestToUser(data.field);
  };

  function addFieldOfInterestToUser(field) {
    console.log(field);
    var url =
      field.id === null
        ? `field/new/user/${user.id}`
        : `field/${field.id}/user/${user.id}`;

    apiPost(url, field, () => {
      window.location.reload();
    });
  }

  const handleClickOpenRemoveFieldOfInterest = (fieldOfInterest) => {
    setFieldOfInterestToBeRemoved(fieldOfInterest);
  };

  const handleCloseRemoveFieldOfInterest = (remove) => {
    if (remove) removeFieldOfInterestFromUser(fieldOfInterestToBeRemoved);
    setFieldOfInterestToBeRemoved(null);
  };

  function removeFieldOfInterestFromUser(field) {
    apiDelete(`field/${field.id}/user/${user.id}`, () => {
      window.location.reload();
    });
  }

  useEffect(() => {
    function onProjectsListLoaded(data) {
      setProjectsList(data);
    }

    function onFieldOfInterestListLoaded(data) {
      setFieldOfInterestList(data);
    }

    apiGet("user/projects", onProjectsListLoaded, undefined);
    apiGet("user/fields", onFieldOfInterestListLoaded, undefined);
  }, []);

  function onNewProjectClicked() {
    history.push("/newproject");
  }

  function showCreateProjectButton() {
    if (user.userType === "TEACHER") {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={onNewProjectClicked}
          fullWidth
        >
          Novo Projeto
        </Button>
      );
    }
  }

  function showFieldOfInterestList() {
    if (user.userType === "TEACHER") {
      return (
        <>
          <Typography variant="h3" component="h1" align="center">
            Áreas de Interesse
          </Typography>
          <List>
            {fieldOfInterestList.map((f) => (
              <ListItem key={f.id} component={Link} to={`/field/${f.id}`}>
                <ListItemText primary={f.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={(event) => {
                      event.preventDefault();
                      handleClickOpenRemoveFieldOfInterest(f);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
            fullWidth
          >
            Adicionar
          </Button>
          <AddFieldOfInterestToUser
            open={open}
            handleClose={handleClose}
            currentFieldOfInterestList={fieldOfInterestList.map((f) => f.id)}
          />
          <AlertDialog
            open={fieldOfInterestToBeRemoved != null}
            handleClose={handleCloseRemoveFieldOfInterest}
            title="Remover área de interesse"
            body={
              fieldOfInterestToBeRemoved == null
                ? ""
                : `Tem certeza que deseja remover ${fieldOfInterestToBeRemoved.name} das suas áreas de interesse?`
            }
          />
          <br />
          <br />
        </>
      );
    }
  }

  return (
    <Container component="article">
      <Typography variant="h3" component="h1" align="center">
        Projetos
      </Typography>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Assunto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectsList.map((project) => (
              <TableRow key={project.id}>
                <TableCell component="th" scope="row">
                  <Link to={`/project/${project.id}`}>{project.title}</Link>
                </TableCell>
                <TableCell align="right">{project.subject}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      {showCreateProjectButton()}
      <br />
      <br />
      <br />
      {showFieldOfInterestList()}
    </Container>
  );
}

export default SignedInHomePage;
