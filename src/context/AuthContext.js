import React, { createContext, useState, useContext, useEffect } from "react";
import CryptoJS from "crypto-js";

// Create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // State to store the user ID of the logged-in user
    const [userId, setUserId] = useState(null);

    // State to track whether the user is logged in or not
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Secret key used for encryption and decryption (retrieved from environment variables)
    const secretKey = process.env.EXPO_PUBLIC_SECRET_KEY;

    // Function to log in a user by setting their user ID and updating the logged-in state
    const login = (id) => {
        setUserId(id);
        setIsLoggedIn(true);
    };

    // Function to log out a user by clearing their user ID and updating the logged-in state
    const logout = () => {
        setUserId(null);
        setIsLoggedIn(false);
    };

    // Effect to check for an encrypted user ID in localStorage when the component mounts
    useEffect(() => {
        const encryptedUserId = localStorage.getItem("user_id"); // Retrieve the encrypted user ID from localStorage
        if (encryptedUserId) {
            try {
                // Decrypt the user ID using the secret key
                const bytes = CryptoJS.AES.decrypt(encryptedUserId, secretKey);
                const decryptedUserId = bytes.toString(CryptoJS.enc.Utf8);

                // If decryption is successful, set the user ID and mark the user as logged in
                if (decryptedUserId) {
                    setUserId(decryptedUserId);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                // Log an error if decryption fails
                console.error("Failed to decrypt user ID:", error);
            }
        }
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    return (
        // Provide the authentication context to child components
        <AuthContext.Provider value={{ userId, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to allow easy access to the authentication context
export const useAuth = () => useContext(AuthContext);
