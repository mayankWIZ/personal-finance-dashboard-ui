import axiosInstance from './axiosService';

function getToken(username, password) {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return axiosInstance.post("/auth", formData);
}

function signup(payload) {
    return axiosInstance.post("/users/signup", payload);
}

function changePassword(payload) {
    return axiosInstance.patch("/users/change_password", payload);
}

function getExchangeRates() {
    return axiosInstance.get("/exchange-rates");
}

export {
    getToken,
    signup,
    getExchangeRates,
    changePassword,
};