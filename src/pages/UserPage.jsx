import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useApi } from "../contexts/ApiContext";
import { Container } from "@material-ui/core";
import { StudentUserView, TeacherUserView } from "../components/user";

function UserPage() {
  const { apiGet } = useApi();
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    apiGet(`public/user/${id}`, setUser).catch(() => {
      history.push("/404");
    });
  }, []);

  return (
    <Container component="article">
      {user.userType === "STUDENT" ? (
        <StudentUserView user={user} />
      ) : (
        <TeacherUserView user={user} />
      )}
    </Container>
  );
}

export default UserPage;
