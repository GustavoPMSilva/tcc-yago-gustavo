import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";

function GpfTextField({
  id,
  label,
  value,
  onChange,
  type,
  required,
  rows,
  error,
  helperText,
  showButton,
  endButton,
  onEndButtonClicked,
}) {
  function showEndButton() {
    if (showButton !== undefined && showButton === true) {
      return (
        <Grid item alignItems="stretch" style={{ display: "flex" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onEndButtonClicked}
          >
            {endButton}
          </Button>
        </Grid>
      );
    }
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs>
          <TextField
            id={id}
            name={id}
            label={label}
            type={type || "text"}
            variant="outlined"
            value={value}
            onChange={(event) => {
              event.stopPropagation();
              onChange(event.target.value);
            }}
            fullWidth
            required={required || false}
            multiline={rows ? true : false}
            rows={rows || 1}
            error={error}
            helperText={helperText}
          />
        </Grid>
        {showEndButton()}
      </Grid>
      <br />
    </>
  );
}

export default GpfTextField;
