import Axios from "axios";

export const api = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("@GeProFi:token"),
  },
});

export const apiGet = async (url, callback) => {
  const response = await api.get(url);
  callback(response.data);
};

export const apiPost = async (url, body, callback) => {
  const response = await api.post(url, body);
  callback(response.data);
};

export const apiPut = async (url, body, callback) => {
  const response = await api.put(url, body);
  callback(response.data);
};
