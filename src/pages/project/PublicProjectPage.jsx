import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { apiGet } from "../../service/api";
import { Container, Typography } from "@material-ui/core";
import UserList from "../../components/UserList";

function PublicProjectPage() {
  let history = useHistory();
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function onProjectLoaded(data) {
      setProject(data);
      setLoading(false);
    }

    apiGet(`public/project/${id}`, onProjectLoaded).catch(() => {
      history.push("/404");
    });
  }, [id, setProject, setLoading, history]);

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
            {project.status}
          </Typography>
          <Typography variant="body1" align="center">
            {project.registerDate}
          </Typography>
          <Typography variant="body1" align="center">
            {project.keywords}
          </Typography>
          <UserList userList={project.userList} />
        </>
      )}
    </Container>
  );
}

export default PublicProjectPage;
