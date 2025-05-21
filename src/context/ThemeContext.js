import React, { createContext, useEffect, useState } from "react";

// Create a context for theme management with default values
export const ThemeContext = createContext({
    theme: "light", // Default theme is "light"
    toggleTheme: () => {}, // Placeholder function for toggling theme
});

// ThemeProvider component to manage and provide theme state to the app
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light"); // State to store the current theme

    // Detect system preference for dark mode on component mount
    useEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches; // Check if the system prefers dark mode
        setTheme(prefersDark ? "dark" : "light"); // Set theme based on system preference
    }, []); // Empty dependency array ensures this runs only once on mount

    // Apply the current theme as a class to the <html> element
    useEffect(() => {
        const root = window.document.documentElement; // Reference to the <html> element
        if (theme === "dark") {
            root.classList.add("dark"); // Add "dark" class if theme is dark
        } else {
            root.classList.remove("dark"); // Remove "dark" class if theme is light
        }
    }, [theme]); // Runs whenever the theme state changes

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark")); // Toggle theme state
        localStorage.setItem("theme", theme === "dark" ? "light" : "dark"); // Save the new theme to localStorage
    };

    // Provide the theme state and toggle function to child components
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children} {/* Render child components */}
        </ThemeContext.Provider>
    );
};
