import axios from "axios";

export const API = axios.create({
  baseURL: "https://gnanalytica-backend.wittywave-d8ad2c0e.eastus2.azurecontainerapps.io/api",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});