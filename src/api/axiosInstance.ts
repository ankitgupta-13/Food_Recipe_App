import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
