import React from "react";
import { TextField } from "@material-ui/core";

function Textfield({ id, label, value, onChange, type, required }) {
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
    />
  );
}

export default Textfield;
