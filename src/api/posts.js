import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3500',  // Removed "/post" from the baseURL
});

export default api;
