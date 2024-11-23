import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Base URL del backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token de autorización
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Obtén el token del localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Añade el token en el encabezado
  }
  return config;
});

export default api;
