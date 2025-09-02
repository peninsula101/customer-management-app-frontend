import axios from "axios";

export const api = axios.create({
  baseURL: "https://customer-management-app-backend.onrender.com/api", // backend
});
