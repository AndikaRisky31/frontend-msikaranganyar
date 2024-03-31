import { useMutation } from "react-query";
import { axiosInstance } from "../../../lib/axios/axios";
import Cookies from "js-cookie";

export const useLoginUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const response = await axiosInstance.post("/auth/login", body);
      Cookies.set("access_token", `Bearer ${response.data.token}`);
      return response.data;
    },
    onSuccess,
    onError,
  });
};
