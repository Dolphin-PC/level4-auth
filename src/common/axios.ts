import axios from "axios";

const api = axios.create({
  proxy: {
    host: "http://3.38.191.164",
    port: 80,
  },
  baseURL: "http://3.38.191.164",
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
