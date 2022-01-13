import axios from "axios";
import {
  ServiceInterface,
  ClientInterface,
} from "../interfaces/serviceInterface";

const baseURL = process.env.REACT_APP_API_URL + "/api";

axios.defaults.baseURL = baseURL;

export const createServiceApi = (data: any) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return axios.post("service/add", data, {
    params: { id: 1 },
    headers: { Authorization: TOKEN },
  });
};

export const listServiceApi = (url: string) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return axios.get(url, {
    headers: { Authorization: TOKEN },
  });
};

export const getDetailTicketApi = (id: string) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return axios.get("service/ticket/" + id, {
    headers: { Authorization: TOKEN },
  });
};

export const deleteTicketApi = (id: number) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return axios.delete("service/ticket/" + id, {
    headers: { Authorization: TOKEN },
  });
};

export const getClientTicketApi = (id: string) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return axios.get("service/clientTicket/" + id, {
    headers: { Authorization: TOKEN },
  });
};

export const addAdvanceApi = (data: any) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return axios.post("service/advance/", data, {
    headers: { Authorization: TOKEN },
  });
};

export const removeAdvanceApi = (id: number) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return axios.delete("service/advance/" + id, {
    headers: { Authorization: TOKEN },
  });
};

export const removeServiceApi = (id: number) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return axios.delete("service/detail/" + id, {
    headers: { Authorization: TOKEN },
  });
};
export const updateServiceApi = (id: number, data: ServiceInterface) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return axios.put("service/detail/" + id + "/", data, {
    headers: { Authorization: TOKEN },
  });
};

export const finishProjectApi = (id: number) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return axios.post("service/finish/" + id, null, {
    headers: { Authorization: TOKEN },
  });
};

export const CloseProjectApi = (id: number) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return axios.post("service/close/" + id, null, {
    headers: { Authorization: TOKEN },
  });
};

export const getClientApi = (id: string) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return axios.get("auth/client/" + id, {
    headers: { Authorization: TOKEN },
  });
};
export const updateClientApi = (id: number, data: ClientInterface) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return axios.put("auth/client/" + id + "/", data, {
    headers: { Authorization: TOKEN },
  });
};

export const getClientsAllApi = (url: string) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return axios.get(url, { headers: { Authorization: TOKEN } });
};

export const getReportApi = () => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return axios.get("service/report", {
    headers: { Authorization: TOKEN },
  });
};
