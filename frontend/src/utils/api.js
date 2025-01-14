import axios from "axios";
import { BASE_BACKEND_URL } from "./constants";

const API_URL = `${BASE_BACKEND_URL}/api`;
 
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;