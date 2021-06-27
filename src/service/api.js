import Axios from "axios";

export const api = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("@GeProFi:token"),
  },
});

export const apiGet = async (url, callback) => {
  const resposta = await api.get(url);
  callback(resposta.data);
};

export const apiPost = async (url, body, callback) => {
  const resposta = await api.post(url, body);
  callback(resposta.data);
};

export const apiPut = async (url, body, callback) => {
  const resposta = await api.put(url, body);
  callback(resposta.data);
};
