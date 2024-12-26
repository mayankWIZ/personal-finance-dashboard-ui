import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // If change password in message navigate to change password page
            const user = JSON.parse(localStorage.getItem("user"));
            if (user?.firstLogin) {
                toast.warning("Please change your password first.");
                window.location.href = "/change-password";
            } else {
                // If not navigate to login
                localStorage.removeItem("access_token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
