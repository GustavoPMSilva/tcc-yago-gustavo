import React from "react";
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

function UserList({ userList, showRole }) {
  function getUserRole(user) {
    switch (user.userType) {
      case "STUDENT":
        return "Estudante";
      default: {
        if (user.coop) return "Co-Orientador";
        else if (user.committee) return "Banca";
        else return "Orientador";
      }
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Página pessoal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                <Link to={`/user/${user.id}`}>{`${user.name}${
                  showRole ? ` (${getUserRole(user)})` : ""
                }`}</Link>
              </TableCell>
              <TableCell align="right">{user.userProfile}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserList;
