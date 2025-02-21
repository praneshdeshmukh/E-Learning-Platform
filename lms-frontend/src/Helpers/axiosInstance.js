import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// Optional: Add response interceptor for global error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;

// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/v1";

// const axiosInstance = axios.create();

// axiosInstance.defaults.baseURL = BASE_URL;
// axiosInstance.defaults.withCredentials = true;

// export default axiosInstance;
// import axios from "axios";
// const BASE_URL = 'https://localhost:5000/api/v1'
// const axiosInstance = axios.create();


// axiosInstance.defaults.baseURL = BASE_URL;
// axiosInstance.defaults.withCredentials = true;
// axiosInstance.defaults.timeout = 5000;

// export default axiosInstance;

// import axios from "axios";

// const BASE_URL ="https://lms-server-vd61.onrender.com/api/v1";

// const axiosInstance = axios.create();

// axiosInstance.defaults.baseURL=BASE_URL;
// axiosInstance.defaults.withCredentials=true;

// export default axiosInstance;