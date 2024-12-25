import axiosInstance from './axiosService';

function getToken(username, password) {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return axiosInstance.post("/auth", formData);
}

function getExchangeRates() {
    return axiosInstance.get("/exchange-rates");
}

export {
    getToken,
    getExchangeRates,
};