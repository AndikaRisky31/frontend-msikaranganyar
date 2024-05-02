import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL =process.env.REACT_APP_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstanceAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: getToken() ? `Bearer ${getToken()}` : null,
  },
});

// Interceptor untuk mengupdate header Authorization sebelum permintaan dikirim
axiosInstanceAuth.interceptors.request.use(
  (config) => {
    const token = getToken();
    // Jika token tersedia, atur ulang header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);