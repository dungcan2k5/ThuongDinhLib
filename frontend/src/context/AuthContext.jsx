import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để dùng trong các component
export const useAuth = () => useContext(AuthContext);
