import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

function GpfSelect({ id, label, options, value, onChange, required }) {
  function renderOptions() {
    const optionsList = Object.entries(options);

    return optionsList.map(([key, value]) => (
      <MenuItem key={key} value={key}>
        {value}
      </MenuItem>
    ));
  }

  return (
    <>
      <FormControl required={required || false} fullWidth>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={`${id}-select`}
          value={value}
          onChange={(event) => {
            event.stopPropagation();
            onChange(event.target.value);
          }}
        >
          {renderOptions()}
        </Select>
      </FormControl>
      <br />
      <br />
    </>
  );
}

export default GpfSelect;
