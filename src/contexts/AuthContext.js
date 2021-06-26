import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { api } from "../service/api";

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("@GeProFi:user"))
  );

  async function login(username, password) {
    const body = { username: username, password: password };
    const response = await api.post("/auth", body);
    const data = response.data;
    console.log(data);
    const token = data.accessToken;
    const user = data.user;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    localStorage.setItem("@GeProFi:token", token);
    localStorage.setItem("@GeProFi:user", JSON.stringify(user));
    setUser(user);
  }

  function logout(callback) {
    api.defaults.headers.Authorization = null;
    localStorage.removeItem("@GeProFi:token");
    localStorage.removeItem("@GeProFi:user");
    setUser(null);
    callback();
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
