import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Table,
  TableHead,
} from "@material-ui/core";
import { useApi } from "../contexts/ApiContext";

function SignedInHomePage() {
  const { apiGet } = useApi();
  const { user } = useApi();
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    function onListLoaded(data) {
      setProjectsList(data);
    }

    apiGet("user/projects", onListLoaded, undefined);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Página pessoal {user.userType}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectsList.map((project) => (
            <TableRow key={project.id}>
              <TableCell component="th" scope="row">
                <Link to={`/project/${project.id}`}>{project.title}</Link>
              </TableCell>
              <TableCell align="right">{project.subject}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SignedInHomePage;
