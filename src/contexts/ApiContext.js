import React, { useContext, useState } from "react";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { useSnackbar } from "react-simple-snackbar";

const api = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("@GeProFi:token"),
  },
});

const successOptions = {
  style: {
    backgroundColor: "#5AAF4B",
    color: "white",
  },
};

const errorOptions = {
  style: {
    backgroundColor: "#EA402F",
    color: "white",
  },
};

export function useApi() {
  const context = useContext(ApiContext);

  return context;
}

const ApiContext = React.createContext({});

export const ApiProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [successSnackbar, _] = useSnackbar(successOptions);
  const [errorSnackbar, __] = useSnackbar(errorOptions);

  async function doCall(call, callback, errorCallback) {
    call
      .then((response) => {
        setLoading(false);
        successSnackbar("Sucesso");
        if (callback !== undefined) {
          callback(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        errorSnackbar("Erro");
        if (errorCallback !== undefined) {
          errorCallback(error);
        }
      });
  }

  async function apiGet(url, callback, errorCallback) {
    setLoading(true);
    doCall(api.get(url), callback, errorCallback);
  }

  async function apiPost(url, body, callback, errorCallback) {
    setLoading(true);
    doCall(api.post(url, body), callback, errorCallback);
  }

  async function apiPut(url, body, callback, errorCallback) {
    setLoading(true);
    doCall(api.put(url, body), callback, errorCallback);
  }

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("@GeProFi:user"))
  );

  function onLoginSuccess(data) {
    const token = data.accessToken;
    const user = data.user;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    localStorage.setItem("@GeProFi:token", token);
    localStorage.setItem("@GeProFi:user", JSON.stringify(user));
    setUser(user);
  }

  async function login(username, password, callback, errorCallback) {
    setLoading(true);
    api
      .post("/auth", { username: username, password: password })
      .then((response) => {
        setLoading(false);
        successSnackbar("Sucesso");
        onLoginSuccess(response.data);
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        errorSnackbar("Erro");
        errorCallback(error);
      });
  }

  function logout(callback) {
    api.defaults.headers.Authorization = null;
    localStorage.removeItem("@GeProFi:token");
    localStorage.removeItem("@GeProFi:user");
    setUser(null);
    callback();
  }

  return (
    <ApiContext.Provider
      value={{
        signed: Boolean(user),
        user,
        login,
        logout,
        apiGet,
        apiPost,
        apiPut,
      }}
    >
      <LoadingOverlay active={loading} spinner>
        {children}
      </LoadingOverlay>
    </ApiContext.Provider>
  );
};
