import axios from "axios";

export const baseURL = "https://ferhat1999.pythonanywhere.com";

export default axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setHeader(axiosInstance, token) {
  axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Token ${token}`;
    return config;
  });
}
