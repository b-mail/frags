import axios from "axios";
import { refresh } from "@/lib/api";
import useAuth from "@/store/AuthStore";

const instance = axios.create({
  baseURL: process.env.API_URL,
  validateStatus: (status) => status < 500,
});

instance.interceptors.request.use(
  async (config) => {
    const token = config.headers.get("Authorization") as string;
    if (token) {
      const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(
        decodeURIComponent(
          window
            .atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(""),
        ),
      );
      if (decoded.exp * 1000 < Date.now()) {
        const res = await refresh();
        config.headers.set("Authorization", `Bearer ${res.accessToken}`);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
