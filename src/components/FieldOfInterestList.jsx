import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Table,
  TableHead,
  TextField,
} from "@material-ui/core";

function FieldOfInterestList({ fieldOfInterests }) {
  const [search, setSearch] = useState("");

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <TextField
                id="search"
                name="search"
                label="Buscar"
                variant="outlined"
                margin="dense"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Descrição</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fieldOfInterests
            .filter(
              (i) =>
                i.name.toLowerCase().includes(search.toLowerCase()) ||
                i.description.toLowerCase().includes(search.toLowerCase())
            )
            .map((field) => (
              <TableRow key={field.id}>
                <TableCell component="th" scope="row">
                  <Link
                    to={`/public/field/${field.id}/users?name=${field.name}`}
                  >
                    {field.name}
                  </Link>
                </TableCell>
                <TableCell align="right">{field.description}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FieldOfInterestList;
