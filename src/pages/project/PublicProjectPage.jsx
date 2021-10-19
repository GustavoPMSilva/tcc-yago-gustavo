import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import { Container, Typography } from "@material-ui/core";
import UserList from "../../components/UserList";

function PublicProjectPage() {
  const { apiGet } = useApi();
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

  return (
    <Container component="article">
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <Typography variant="h3" component="h1" align="center">
            {project.title}
          </Typography>
          <Typography variant="h5" align="center">
            {project.subject}
          </Typography>
          <Typography variant="body1" align="center">
            {project.description}
          </Typography>
          <Typography variant="body1" align="center">
            {project.keywords}
          </Typography>
          <Typography variant="body1" align="center">
            <a href={project.file} target="_blank" rel="noreferrer">
              {project.file}
            </a>
          </Typography>
          <UserList userList={project.userList} />
        </>
      )}
    </Container>
  );
}

export default PublicProjectPage;
