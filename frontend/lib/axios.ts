import { LOCAL_KEYS } from "@/constant/enums";
import { NEXT_PUBLIC_API_URL } from "@/constant/envs";
import { COMMON_MESSAGES } from "@/constant/messages";
import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  timeout: 50000,
});

// Helper function to recursively convert date strings to Date objects
const convertDates = (data: any): any => {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === "string") {
    // Check if string matches ISO 8601 date format
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
    if (isoDateRegex.test(data)) {
      return new Date(data);
    }
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(convertDates);
  }

  if (typeof data === "object") {
    const converted: any = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        converted[key] = convertDates(data[key]);
      }
    }
    return converted;
  }

  return data;
};

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
  (response) => {
    // Convert date strings to Date objects in response data
    if (response.data) {
      response.data = convertDates(response.data);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const { message } = data || {};

      if (status === 429) {
        toast.error("Too many requests — please wait a moment and try again.");
        return Promise.resolve(error.response);
      }

      if (
        message === COMMON_MESSAGES.INVALID_AUTH_TOKEN ||
        message === COMMON_MESSAGES.TOKEN_EXPIRED
      ) {
        localStorage.removeItem(LOCAL_KEYS.USER_DATA);
        toast.error("Token expired");
        window.location.replace("/auth/login");
      }

      return Promise.resolve(error.response);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
