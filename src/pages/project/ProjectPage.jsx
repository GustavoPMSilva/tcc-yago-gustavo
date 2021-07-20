import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import {
  StudentProjectView,
  TeacherProjectView,
} from "../../components/project";
import { apiGet } from "../../service/api";
import { Container, Typography } from "@material-ui/core";
import { useApi } from "../../contexts/ApiContext";

function ProjectPage() {
  let history = useHistory();
  const { id } = useParams();
  const { user } = useApi();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function onProjectLoaded(data) {
      console.log(data);
      setProject(data);
      setLoading(false);
    }

    apiGet(`project/${id}`, onProjectLoaded).catch(() => {
      history.push("/404");
    });
  }, [id, setProject, setLoading, history]);

  return (
    <Container component="article">
      <Typography variant="h3" component="h1" align="center">
        Projeto
      </Typography>
      {loading ? (
        <p>Loading</p>
      ) : user.userType === "STUDENT" ? (
        <StudentProjectView project={project} />
      ) : (
        <TeacherProjectView project={project} />
      )}
    </Container>
  );
}

export default ProjectPage;
