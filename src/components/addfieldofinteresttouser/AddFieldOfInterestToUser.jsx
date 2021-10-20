import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  DialogActions,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import GpfTextField from "../core/GpfTextfield";
import { useApi } from "../../contexts/ApiContext";

function AddFieldOfInterestToUser({
  open,
  handleClose,
  currentFieldOfInterestList,
}) {
  const { apiGet } = useApi();
  const [fieldOfInterestList, setFieldOfInterestList] = useState([]);
  const [value, setValue] = useState("");
  const [newFieldOfInterest, setNewFieldOfInterest] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function onListLoaded(data) {
    setFieldOfInterestList(
      data.filter((i) => !currentFieldOfInterestList.includes(i.id))
    );
  }

  useEffect(() => {
    if (open) {
      setValue("");
      setName("");
      setDescription("");
      setNewFieldOfInterest(false);
      apiGet("field", onListLoaded);
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        onClose={(event) => {
          event.stopPropagation();
          handleClose(null);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Adicionar Área de Interesse
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            {newFieldOfInterest ? (
              <></>
            ) : (
              <>
                <InputLabel id="field-of-interest-label">
                  Área de Interesse
                </InputLabel>
                <Select
                  labelId="field-of-interest-label"
                  id="field-of-interest-select"
                  value={value}
                  onChange={(event) => {
                    event.stopPropagation();
                    setValue(event.target.value);
                  }}
                >
                  {fieldOfInterestList.map((f) => (
                    <MenuItem key={f.id} value={f.id}>
                      {f.name}
                    </MenuItem>
                  ))}
                </Select>
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => {
                    event.preventDefault();
                    setNewFieldOfInterest(true);
                  }}
                >
                  Nova Área de Interesse
                </Button>
              </>
            )}
            {newFieldOfInterest ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
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
                  rows={5}
                  required
                />
              </form>
            ) : (
              <></>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={(event) => {
              event.preventDefault();
              handleClose(null);
            }}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            onClick={(event) => {
              event.preventDefault();
              var field = newFieldOfInterest
                ? { id: null, name: name, description: description }
                : fieldOfInterestList.find((u) => u.id === value);
              handleClose({
                field: field,
              });
            }}
            disabled={
              (!newFieldOfInterest && value === "") ||
              (newFieldOfInterest &&
                (name.length === 0 || description.length === 0))
            }
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddFieldOfInterestToUser;
