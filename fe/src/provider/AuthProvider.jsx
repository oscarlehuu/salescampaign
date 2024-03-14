import { API_ENDPOINT } from "config/api";
import { axiosInstance } from "config/axios";
import { AUTHENTICATION } from "constants/api";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  const getMe = async () => {
    const getMeResponse = await axiosInstance.get(API_ENDPOINT.AUTH_ME);
    setUser(getMeResponse.data);
    setIsChecking(false);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(AUTHENTICATION.ACCESS_TOKEN);
    if (!accessToken) {
      setIsChecking(false);
    }

    if (accessToken && !user) {
      getMe();
    }
  }, [user]);

  const value = {
    user,
    setUser,
    isChecking,
    setIsChecking,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
