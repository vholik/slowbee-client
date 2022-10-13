import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

instance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("user") as string).token;
  config.headers!.Authorization = token ? `Bearer ${token}` : null;
  return config;
});

export default instance;
