import { LOCAL_KEYS } from "@/constant/enums";
import { NEXT_PUBLIC_API_URL } from "@/constant/envs";
import { COMMON_MESSAGES } from "@/constant/messages";
import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  timeout: 50000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const localUser = localStorage.getItem(LOCAL_KEYS.USER_DATA);
    if (localUser) {
      const parsed = JSON.parse(localUser);
      if (parsed) {
        const foundToken = parsed?.token;
        config.headers.Authorization = `Bearer ${foundToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { message } = error.response.data || {};
      if (
        message === COMMON_MESSAGES.INVALID_AUTH_TOKEN ||
        message === COMMON_MESSAGES.TOKEN_EXPIRED ||
        message === COMMON_MESSAGES.UNAUTHORIZED
      ) {
        localStorage.removeItem(LOCAL_KEYS.USER_DATA);
        toast.error("Token expired");
        window.location.replace("/");
      }
      return Promise.resolve(error.response);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
