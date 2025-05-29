import axios from "axios";

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/", // Replace with your API base URL
  timeout: 10000, // Set a timeout in milliseconds
});

// Add a request interceptor to attach headers or tokens
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); // Replace with your token key if needed
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle responses or errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors, e.g., redirect to login
      console.error("Unauthorized. Please log in.");
      // Optionally, log out the user or navigate to the login page
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response; // If the response is successful, return it as is
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens if unauthorized
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // Redirect to the sign-in page
      window.location.href = "/signin"; // Alternatively, use useNavigate in a React component
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
