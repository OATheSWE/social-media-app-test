import React, { createContext, useState, useContext, useEffect } from "react";
import CryptoJS from "crypto-js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const secretKey = process.env.EXPO_PUBLIC_SECRET_KEY;

  const login = (id) => {
    setUserId(id);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserId(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const encryptedUserId = localStorage.getItem("user_id");
    if (encryptedUserId) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedUserId, secretKey);
        const decryptedUserId = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedUserId) {
          setUserId(decryptedUserId);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Failed to decrypt user ID:", error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userId, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy access
export const useAuth = () => useContext(AuthContext);
