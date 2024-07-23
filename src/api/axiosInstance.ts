import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
