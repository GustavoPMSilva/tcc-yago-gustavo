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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet(`public/user/${id}`, (data) => {
      setUser(data);
      setLoading(false);
    }).catch(() => {
      history.push("/404");
    });
  }, []);

  return (
    <Container component="article">
      {loading ? (
        <p>Loading</p>
      ) : user.userType === "STUDENT" ? (
        <StudentUserView user={user} />
      ) : (
        <TeacherUserView user={user} />
      )}
    </Container>
  );
}

export default UserPage;
