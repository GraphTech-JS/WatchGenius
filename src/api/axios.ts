import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios";

const options: CreateAxiosDefaults = {
  baseURL: `http://localhost:3001/api`,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "UA",
  },
  withCredentials: true,
};

const axiosWithAuth = axios.create(options);

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers["Timezone-Val"] =
      Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  return config;
};

axiosWithAuth.interceptors.request.use(authRequestInterceptor);

export default axiosWithAuth;
