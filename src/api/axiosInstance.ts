import axios from "axios";

export const baseURL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL: baseURL,
  //   timeout: 1000,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
