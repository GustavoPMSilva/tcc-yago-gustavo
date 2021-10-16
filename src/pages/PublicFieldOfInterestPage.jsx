import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import UserList from "../components/UserList";
import { useApi } from "../contexts/ApiContext";
import { useQuery } from "../hooks/UseQuery";

function PublicFieldOfInterestPage() {
  let history = useHistory();
  const { apiGet } = useApi();
  const { id } = useParams();
  const query = useQuery();
  const name = query.get("name");
  const [fieldOfInterestUserList, setFieldOfInterestUserList] = useState([]);

  useEffect(() => {
    function onListLoaded(data) {
      setFieldOfInterestUserList(data);
    }

    function onError(error) {
      history.push("/404");
    }

    apiGet(`public/field/${id}/users`, onListLoaded, onError);
  }, []);

  return (
    <Container component="article">
      <Typography variant="h3" component="h1" align="center">
        {`Professores da Área de Interesse - ${name}`}
      </Typography>
      <UserList userList={fieldOfInterestUserList} />
    </Container>
  );
}

export default PublicFieldOfInterestPage;
