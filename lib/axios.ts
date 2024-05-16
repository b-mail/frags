import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  validateStatus: (status) => status < 500,
});

export default instance;
