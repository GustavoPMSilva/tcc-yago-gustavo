import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  StudentProjectView,
  TeacherProjectView,
} from "../../components/project";
import { apiGet } from "../../service/api";
import { Container } from "@material-ui/core";

function ProjectPage() {
  let history = useHistory();
  const { id } = useParams();
  const { user } = useAuth();
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
