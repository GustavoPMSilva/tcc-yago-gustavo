import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useApi } from "../contexts/ApiContext";
import User from "../components/User";

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

  return <User user={user} />;
}

export default UserPage;
