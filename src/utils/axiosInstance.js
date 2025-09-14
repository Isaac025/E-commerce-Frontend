import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-commerce-backend-nwy9.onrender.com/api",
});

export default axiosInstance;
