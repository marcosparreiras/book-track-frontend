import axios, { AxiosError } from "axios";

const api = axios.create({ baseURL: "http://localhost:3000" });

export function axiosErroHandler(error: unknown): Error {
  if (error instanceof AxiosError && error.response?.data.message) {
    return new Error(error.response.data.message);
  }
  return new Error("Algo deu errado, tente novamente mais tarde");
}

export default api;
