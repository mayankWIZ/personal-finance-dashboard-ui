import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

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
        const { logout } = useAuth();
        if (error.response?.status === 401) {
            logout();
            toast.error('Unauthorized');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
