import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;
export const api = axios.create({
  baseURL: baseURL,
  // timeout: 1000,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// {
//   "rewrites": [
//     {
//       "source": "/proxy/:match*",
//       "destination": "https://www.themealdb.com/api/json/v1/1/:match*"
//     }
//   ]
// }
