import axios from "axios";
import { AUTHENTICATION } from "constants/api";

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem(AUTHENTICATION.ACCESS_TOKEN),
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem(AUTHENTICATION.ACCESS_TOKEN);
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      return refreshToken(error);
    }
    const errMessage = error.response?.data || error?.response || error;
    return Promise.reject(errMessage);
  }
);

const refreshToken = async (error) => {
  const refreshToken = localStorage.getItem(AUTHENTICATION.REFRESH_TOKEN);
  if (!refreshToken) {
    logout();
    return;
  }

  try {
    const { data } = await axiosInstance.post("/refresh", { refreshToken });
    localStorage.setItem(AUTHENTICATION.REFRESH_TOKEN, data.refreshToken);

    error.config.headers = {
      Authorization: "Bearer " + data.accessToken,
    };
    return axiosInstance(error.config);
  } catch (error) {
    logout();
    return;
  }
};

export const logout = () => {
  localStorage.removeItem(AUTHENTICATION.ACCESS_TOKEN);
  localStorage.removeItem(AUTHENTICATION.REFRESH_TOKEN);
};
