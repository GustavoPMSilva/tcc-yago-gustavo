import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import SignatureCanvas from "react-signature-canvas";
import { useApi } from "../../contexts/ApiContext";

function SignatureDialog({ open, handleClose, project }) {
  var sigPad = {};
  const { user, apiPost } = useApi();

  function clearCanvas() {
    sigPad.clear();
  }

  function uploadTrimmedSignature() {
    var trimmedSignature = sigPad.getTrimmedCanvas().toDataURL("image/png");

    apiPost(
      `project/${project.id}/record/${project.record.id}/user/${user.id}/sign`,
      { signature: trimmedSignature },
      () => {
        handleClose(true);
      }
    );
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={(event) => {
          event.stopPropagation();
          handleClose(false);
        }}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>Assinar ata</DialogTitle>
        <DialogContent>
          <SignatureCanvas
            canvasProps={{ width: 1750, height: 400, className: "sigCanvas" }}
            ref={(ref) => {
              sigPad = ref;
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={(event) => {
              event.preventDefault();
              handleClose(false);
            }}
            fullWidth
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            onClick={(event) => {
              event.preventDefault();
              clearCanvas();
            }}
            fullWidth
          >
            Limpar
          </Button>
          <Button
            color="primary"
            onClick={(event) => {
              event.preventDefault();
              uploadTrimmedSignature();
            }}
            fullWidth
          >
            Assinar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SignatureDialog;
