import React from "react";
import { TextField } from "@material-ui/core";

function GpfTextField({ id, label, value, onChange, type, required, rows }) {
  return (
    <TextField
      id={id}
      name={id}
      label={label}
      type={type || "text"}
      variant="outlined"
      margin="normal"
      value={value}
      onChange={(event) => {
        event.stopPropagation();
        onChange(event.target.value);
      }}
      fullWidth
      required={required || false}
      multiline={rows ? true : false}
      rows={rows || 1}
    />
  );
}

export default GpfTextField;
