import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core";
import FieldOfInterestList from "../components/FieldOfInterestList";
import { useEffect } from "react";
import { useApi } from "../contexts/ApiContext";

function PublicPage() {
  const { apiGet } = useApi();
  const [fieldOfInterestList, setFieldOfInterestList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function onListLoaded(data) {
      setFieldOfInterestList(data);
      setLoading(false);
    }

    apiGet("public/field", onListLoaded);
  }, [apiGet, setFieldOfInterestList, setLoading]);

  return (
    <Container component="article">
      <Typography variant="h3" component="h1" align="center">
        Buscar Áreas de Interesse
      </Typography>
      <FieldOfInterestList
        fieldOfInterests={fieldOfInterestList}
        loading={loading}
      />
    </Container>
  );
}

export default PublicPage;
