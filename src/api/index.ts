import axios, { AxiosError } from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({ baseURL: backendUrl });

export function axiosErroHandler(error: unknown): Error {
  if (error instanceof AxiosError && error.response?.data.message) {
    return new Error(error.response.data.message);
  }
  return new Error("Algo deu errado, tente novamente mais tarde");
}

export default api;
