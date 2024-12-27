import axiosInstance from './axiosService';

function getToken(username, password) {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return axiosInstance.post("/auth", formData);
}

function getUser() {
    return axiosInstance.get("/users/me");
}

function getUsers() {
    return axiosInstance.get("/users");
}

function createUser(payload) {
    return axiosInstance.post("/users", payload);
}

function updateUser(payload) {
    return axiosInstance.patch("/users", payload);
}

function deleteUser(username) {
    return axiosInstance.delete("/users", {
        params: { username }
    });
}

function signup(payload) {
    return axiosInstance.post("/users/signup", payload);
}

function changePassword(payload) {
    return axiosInstance.patch("/users/change_password", payload);
}

function getTransactions() {
    return axiosInstance.get("/transactions");
}

function createTransaction(payload) {
    return axiosInstance.post("/transactions", payload);
}

function updateTransaction(id, payload) {
    return axiosInstance.patch(`/transactions/${id}`, payload);
}

function deleteTransaction(id) {
    return axiosInstance.delete(`/transactions/${id}`);
}

function getExchangeRates() {
    return axiosInstance.get("/exchange-rates");
}

export {
    getToken,
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    signup,
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getExchangeRates,
    changePassword,
};