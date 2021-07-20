import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import {
  StudentProjectView,
  TeacherProjectView,
} from "../../components/project";
import { useApi } from "../../contexts/ApiContext";
import { Container, Typography } from "@material-ui/core";

function ProjectPage() {
  const { apiGet } = useApi();
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

    function onError(error) {
      history.push("/404");
    }

    apiGet(`project/${id}`, onProjectLoaded, onError);
  }, []);

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
