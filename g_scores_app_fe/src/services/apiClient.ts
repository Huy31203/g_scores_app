import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export default apiClient;
