import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log(error.response.data);
      alert(error.response.data.message);
      return Promise.reject(error);
    }
  }
);

export default api;
