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
        // Construct validation message for all 422 validation error
        if (error.response && error.response.status === 422) {
            let details = error.response.data.detail[0];
            let message = `${details.msg?.replace(/^value error,/i, "")}`;
            error.response.data = { detail: message };
        } else if (error.response && error.response.data.detail) {
            // pass
        } else if (error.response && error.response.statusText) {
            error.response.data = { detail: error.response.statusText };
        } else {
            error.response.data.detail =
            error.message || "Error while connecting to server";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
