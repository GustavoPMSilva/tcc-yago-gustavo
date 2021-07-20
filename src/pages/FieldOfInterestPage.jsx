import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import UserList from "../components/UserList";
import { useApi } from "../contexts/ApiContext";

function FieldOfInterestPage() {
  let history = useHistory();
  const { apiGet } = useApi();
  const { id } = useParams();
  const [fieldOfInterestUserList, setFieldOfInterestUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function onListLoaded(data) {
      setFieldOfInterestUserList(data);
      setLoading(false);
    }

    function onError(error) {
      history.push("/404");
    }

    apiGet(`public/field/${id}/users`, onListLoaded, onError);
  }, [apiGet, id, setFieldOfInterestUserList, setLoading, history]);

  return (
    <Container component="article">
      <Typography variant="h3" component="h1" align="center">
        Professores da Área de Interesse
      </Typography>
      <UserList userList={fieldOfInterestUserList} loading={loading} />
    </Container>
  );
}

export default FieldOfInterestPage;
