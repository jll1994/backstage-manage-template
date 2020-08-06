import axios from "axios";
const service = axios.create({
  baseURL: "http://192.168.1.84:8900",
  timeout: 5000,
});
export default service;
