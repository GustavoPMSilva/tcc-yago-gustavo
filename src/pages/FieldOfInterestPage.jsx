import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Container, Typography, Button } from "@material-ui/core";
import UserList from "../components/UserList";
import { useApi } from "../contexts/ApiContext";
import { GpfTextField } from "../components/core";
import { AlertDialog } from "../components/dialog";

function FieldOfInterestPage() {
  let history = useHistory();
  const { apiGet, apiPut, apiDelete } = useApi();
  const { id } = useParams();
  const [fieldOfInterest, setFieldOfInterest] = useState({});
  const [fieldOfInterestUserList, setFieldOfInterestUserList] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [openDeleteFieldOfInterest, setOpenDeleteFieldOfInterest] =
    useState(false);

  useEffect(() => {
    function onFieldOfInterestLoaded(data) {
      setFieldOfInterest(data);
      setName(data.name);
      setDescription(data.description);
    }

    function onListLoaded(data) {
      setFieldOfInterestUserList(data);
    }

    function onError(error) {
      history.push("/404");
    }

    apiGet(`field/${id}`, onFieldOfInterestLoaded, onError);
    apiGet(`field/${id}/users`, onListLoaded, onError);
  }, []);

  const handleClickOpenDeleteFieldOfInterest = () => {
    setOpenDeleteFieldOfInterest(true);
  };

  const handleCloseDeleteFieldOfInterest = (del) => {
    setOpenDeleteFieldOfInterest(false);
    if (del) deleteFieldOfInterest();
  };

  function deleteFieldOfInterest() {
    apiDelete(`field/${fieldOfInterest.id}`, () => {
      history.push("/");
    });
  }

  function showButton() {
    if (fieldOfInterestUserList.length === 0) {
      return (
        <>
          <Button
            variant="contained"
            style={{ backgroundColor: "#eb2915" }}
            onClick={handleClickOpenDeleteFieldOfInterest}
            fullWidth
          >
            Excluir área de interesse
          </Button>
          <AlertDialog
            open={openDeleteFieldOfInterest}
            handleClose={handleCloseDeleteFieldOfInterest}
            title="Excluir área de interesse"
            body={`Tem certeza que deseja excluir ${fieldOfInterest.name}? Essa ação não poderá ser desfeita.`}
          />
        </>
      );
    }
  }

  function saveChanges() {
    fieldOfInterest.name = name;
    fieldOfInterest.description = description;

    apiPut(`field/${fieldOfInterest.id}`, fieldOfInterest);
  }

  return (
    <Container component="article">
      <Typography variant="h3" component="h1" align="center">
        Área de Interesse
      </Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          saveChanges();
        }}
      >
        <GpfTextField
          id="name"
          label="Nome"
          value={name}
          onChange={setName}
          required
        />
        <GpfTextField
          id="description"
          label="Descrição"
          value={description}
          onChange={setDescription}
          rows={3}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "#5AAF4B" }}
          type="submit"
          fullWidth
        >
          Salvar
        </Button>
      </form>
      <br />
      <UserList userList={fieldOfInterestUserList} />
      <br />
      {showButton()}
    </Container>
  );
}

export default FieldOfInterestPage;
