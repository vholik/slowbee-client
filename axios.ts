import axios from "axios";
import * as dotenv from "dotenv";

const instance = axios.create({
  baseURL: process.env.server,
});

instance.interceptors.request.use((config) => {
  const localItem = localStorage.getItem("user") as string;
  if (localItem) {
    const token = JSON.parse(localItem).token;
    config.headers!.Authorization = token ? `Bearer ${token}` : null;
  }

  return config;
});

export default instance;
