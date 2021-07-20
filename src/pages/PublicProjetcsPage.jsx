import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core";
import ProjectsList from "../components/ProjectsList";
import { useEffect } from "react";
import { useApi } from "../contexts/ApiContext";

function PublicProjectsPage() {
  const { apiGet } = useApi();
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    function onListLoaded(data) {
      setProjectsList(data);
    }

    apiGet("public/project", onListLoaded);
  }, []);

  return (
    <Container component="article">
      <Typography variant="h3" component="h1" align="center">
        Buscar Projetos Concluídos
      </Typography>
      <ProjectsList projects={projectsList} />
    </Container>
  );
}

export default PublicProjectsPage;
