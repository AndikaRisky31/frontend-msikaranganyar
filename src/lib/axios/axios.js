import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://apimsi.kencang.id/api/";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstanceAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: Cookies.get("access_token"),
  },
});
