import { createContext, useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { axiosInstance } from "../lib/axios/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const getUser = useCallback(async () => {
    try {
      const token = Cookies.get("access_token");

      if (!token) {
        setData(null);
        return;
      }

      const response = await axiosInstance.get("/auth/login", {
        headers: {
          Authorization: token,
        },
      });

      if (JSON.stringify(response.data) !== JSON.stringify(data)) {
        setData(response.data);
      }

      Cookies.set("access_token", `Bearer ${response.data.token}`);
      getUser();
    } catch (error) {
      return null;
    }
  }, [data]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <AuthContext.Provider value={{ data, setData }}>
      {children}
    </AuthContext.Provider>
  );
};
