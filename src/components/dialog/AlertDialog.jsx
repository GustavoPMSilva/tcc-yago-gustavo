import React from "react";
import {
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core";

function AlertDialog({ open, handleClose, title, body }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(event) => {
            event.stopPropagation();
            handleClose(false);
          }}
        >
          Não
        </Button>
        <Button
          onClick={(event) => {
            event.stopPropagation();
            handleClose(true);
          }}
          autoFocus
        >
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
