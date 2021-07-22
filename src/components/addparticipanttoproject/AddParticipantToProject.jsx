import React, { useState, useEffect, useCallback } from "react";
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

function AddParticipantToProject({ open, handleClose, currentUserList }) {
  const classes = useStyles();
  const { apiGet } = useApi();
  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [search, setSearch] = useState("");

  const columns = [
    { field: "name", headerName: "Nome", flex: 3 },
    { field: "email", headerName: "E-mail", flex: 3 },
    {
      field: "userType",
      headerName: "Tipo",
      flex: 1,
      valueGetter: (params) => `${UserType[params.value] || ""}`,
    },
    { field: "origin", headerName: "Origem", flex: 2 },
    {
      field: "coop",
      headerName: "Co-orientador",
      type: "boolean",
      editable: true,
      flex: 1,
    },
    {
      field: "committee",
      headerName: "Banca",
      type: "boolean",
      editable: true,
      flex: 1,
    },
  ];

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value, props }) => {
      if (field === "coop") {
        const coop = !value;
        const updatedUserList = userList.map((row) => {
          if (row.id === id) {
            return { ...row, coop };
          }
          return row;
        });
        setUserList(updatedUserList);
      } else if (field === "committee") {
        const committee = !value;
        const updatedUserList = userList.map((row) => {
          if (row.id === id) {
            return { ...row, committee };
          }
          return row;
        });
        setUserList(updatedUserList);
      }
    },
    [userList]
  );

  useEffect(() => {
    function onListLoaded(data) {
      setUserList(data.filter((i) => !currentUserList.includes(i.id)));
    }

    apiGet("user", onListLoaded);
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
          selectionModel={selectedUserId}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectedUserId(newSelectionModel);
          }}
          onEditCellChangeCommitted={handleEditCellChangeCommitted}
          isCellEditable={(params) => {
            let userType = UserType[params.row.userType];
            return (
              userType === UserType.TEACHER ||
              userType === UserType.EXTERNAL_TEACHER
            );
          }}
          disableColumnFilter
          disableColumnMenu
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
              handleClose({
                user: userList.find((u) => u.id === selectedUserId[0]),
              });
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
