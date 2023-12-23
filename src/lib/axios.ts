import axios from "axios";
import { BACKEND_URL } from "./env";

const api = axios.create({
  baseURL: `${BACKEND_URL}/api/external`,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default api;
