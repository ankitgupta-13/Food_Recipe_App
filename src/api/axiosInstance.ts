import axios from "axios";

export const api = axios.create({
  baseURL: "/proxy",
  // timeout: 1000,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
