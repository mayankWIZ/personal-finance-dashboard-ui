import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/apiService";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const login = (username, password) => {
    getToken(username, password)
      .then((response) => {
        const { access_token, ...user } = response.data;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Login successful.");
        if (user.firstLogin) {
          navigate("/change-password");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        navigate("/login", {
          state: { message: "Invalid credentials. Please try again." },
        });
      });
  };

  const logout = (message = "") => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    toast.error(message || "You have been logged out.");
    navigate("/login", {
      state: { message: message || "You have been logged out." },
    });
  };

  const hasScopes = (scopes, checkType = "every") => {
    const user = JSON.parse(localStorage.getItem("user"));
    return scopes?.[checkType]((scope) =>
      user?.scopes?.includes(scope)
    );
  };

  const authState = {
    access_token: localStorage.getItem("access_token"),
    user: JSON.parse(localStorage.getItem("user")),
    isLoggedIn: !!localStorage.getItem("access_token"),
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, hasScopes }}>
      {children}
    </AuthContext.Provider>
  );
};
