import React, { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getToken } from "../services/apiService";

export const AuthContext = createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    access_token: null,
    user: null
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadAuthState();
  }, [location?.pathname]);

  const loadAuthState = () => {
    const accessToken = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");
    if (accessToken && user) {
      setAuthState({
        access_token: accessToken,
        user: JSON.parse(user)
      });
      setIsLoggedIn(true);
    }
  };

  const login = (username, password) => {
    getToken(username, password)
      .then((response) => {
        const { access_token, ...user } = response.data;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user", JSON.stringify(user));
        setAuthState({
          access_token: access_token,
          user: user,
        });
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        navigate("/login", {
          state: { message: "Invalid credentials. Please try again." },
        });
      });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setAuthState({ access_token: null, user: null, isLoggedIn: false });
    setIsLoggedIn(false);
    navigate("/login", {
      state: { message: "Session expired. Please login again." },
    });
  };

  const hasScope = (scope) => {
    return authState.user?.scopes?.includes(scope);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn,authState, login, logout, hasScope }}>
      {children}
    </AuthContext.Provider>
  );
};
