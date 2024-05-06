import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  validateStatus: (status) => status < 500,
});

export default instance;
