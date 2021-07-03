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
  LinearProgress,
} from "@material-ui/core";

function ProjectsList({ projects, loading }) {
  const [search, setSearch] = useState("");

  function showLoadingCell() {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={2}>
            <LinearProgress />
          </TableCell>
        </TableRow>
      );
    }
  }

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
          {projects
            .filter(
              (i) =>
                i.title.toLowerCase().includes(search) ||
                i.subject.toLowerCase().includes(search)
            )
            .map((project) => (
              <TableRow key={project.id}>
                <TableCell component="th" scope="row">
                  <Link to={`/public/project/${project.id}`}>
                    {project.title}
                  </Link>
                </TableCell>
                <TableCell align="right">{project.subject}</TableCell>
              </TableRow>
            ))}
          {showLoadingCell()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProjectsList;
