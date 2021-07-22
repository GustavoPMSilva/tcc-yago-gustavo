import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import {
  AppBar,
  Dialog,
  DialogActions,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Close } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import { useApi } from "../../contexts/ApiContext";
import { UserType } from "../../models/user";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddParticipantToProject({ open, handleClose }) {
  const classes = useStyles();
  const { apiGet } = useApi();
  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [search, setSearch] = useState("");

  const columns = [
    { field: "name", headerName: "Nome", width: 400 },
    { field: "email", headerName: "E-mail", width: 400 },
    {
      field: "userType",
      headerName: "Tipo",
      width: 200,
      valueGetter: (params) => `${UserType[params.value] || ""}`,
    },
    { field: "origin", headerName: "Origem", width: 400 },
  ];

  useEffect(() => {
    apiGet("user", setUserList);
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={(event) => {
          event.stopPropagation();
          handleClose(null);
        }}
        fullScreen
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={(event) => {
                event.stopPropagation();
                handleClose(null);
              }}
            >
              <Close />
            </IconButton>
            <Typography variant="h6">Adicionar Participante</Typography>
          </Toolbar>
        </AppBar>
        <TextField
          id="search"
          name="search"
          label="Filtrar por nome ou e-mail"
          variant="outlined"
          margin="dense"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          fullWidth
        />
        <DataGrid
          rows={userList.filter(
            (i) =>
              i.name.toLowerCase().includes(search.toLowerCase()) ||
              i.email.toLowerCase().includes(search.toLowerCase())
          )}
          columns={columns}
          pageSize={10}
          onSelectionModelChange={(newSelectionModel) => {
            console.log(newSelectionModel);
            setSelectedUserId(newSelectionModel);
          }}
          selectionModel={selectedUserId}
          disableColumnFilter
        />
        <DialogActions>
          <Button
            onClick={(event) => {
              event.stopPropagation();
              handleClose(null);
            }}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            onClick={(event) => {
              event.stopPropagation();
              handleClose(selectedUserId[0]);
            }}
            color="primary"
            disabled={selectedUserId.length === 0}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddParticipantToProject;
