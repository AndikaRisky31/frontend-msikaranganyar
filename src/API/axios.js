import axios from "axios";

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
    Authorization: localStorage.getItem("access_token") ? `Bearer ${localStorage.getItem("access_token")}` : null,
  },
});