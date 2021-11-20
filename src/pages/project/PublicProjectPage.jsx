import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import { Container, Typography, Button } from "@material-ui/core";
import UserList from "../../components/UserList";

function PublicProjectPage() {
  const { signed, user, apiGet } = useApi();
  let history = useHistory();
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function onProjectLoaded(data) {
      setProject(data);
      setLoading(false);
    }

    function onError(error) {
      history.push("/404");
    }

    apiGet(`public/project/${id}`, onProjectLoaded, onError);
  }, []);

  function goToRecord() {
    history.push(`/record/${project.id}`);
  }

  function showRecordButton() {
    if (signed) {
      var projectUser = project.userList.find((u) => {
        return u.id === user.id;
      });

      if (
        projectUser.userType === "TEACHER" &&
        !projectUser.committee &&
        !projectUser.coop
      ) {
        return (
          <Button
            variant="contained"
            style={{ backgroundColor: "#d9ba21" }}
            onClick={goToRecord}
            fullWidth
          >
            Ver ata
          </Button>
        );
      }
    }
  }

  return (
    <Container component="article">
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <Typography variant="h3" component="h1" align="center">
            {project.title}
          </Typography>
          <br />
          <Typography variant="h5" component="h1">
            Assunto: {project.subject}
          </Typography>
          <br />
          <Typography variant="h5" component="h1">
            Resumo: {project.description}
          </Typography>
          <br />
          <Typography variant="h5" component="h1">
            Palavras-chave: {project.keywords}
          </Typography>
          <br />
          <Typography variant="h5" component="h1">
            Link para o documento do projeto:&nbsp;
            <a href={project.file} target="_blank" rel="noreferrer">
              {project.file}
            </a>
          </Typography>
          <br />
          <Typography variant="h4" component="h1" align="center">
            Participantes
          </Typography>
          <UserList userList={project.userList} showRole />
          <br />
          {showRecordButton()}
        </>
      )}
    </Container>
  );
}

export default PublicProjectPage;
