import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  DialogActions,
  Button,
} from "@material-ui/core";
import GpfTextField from "../core/GpfTextfield";

function ForgotPasswordDialog({ open, handleClose }) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (open) {
      setEmail("");
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={(event) => {
        event.stopPropagation();
        handleClose(null);
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Esqueci minha senha</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleClose(email);
            }}
          >
            <GpfTextField
              id="email"
              label="Email"
              value={email}
              onChange={setEmail}
              required
            />
            <Button color="primary" type="submit">
              Recuperar senha
            </Button>
          </form>
        </FormControl>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default ForgotPasswordDialog;
