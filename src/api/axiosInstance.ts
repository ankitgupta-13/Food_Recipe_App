import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  // timeout: 1000,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
