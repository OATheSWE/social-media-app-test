// Importing global styles and fonts for the application
import "../global.css";
import "../fonts.css";

// Importing styles for the phone input component
import "react-phone-input-2/lib/style.css";

// Importing necessary modules and components from expo-router and React
import { router, Slot } from "expo-router";
import { useEffect, useState } from "react";

// Importing the Splash screen component
import { Splash } from "../src/pages";

// Importing authentication and theme context providers
import { AuthProvider, useAuth } from "@/src/context/AuthContext";
import { ThemeProvider } from "@/src/context/ThemeContext";

// MainApp component handles the core logic of the application
const MainApp = () => {
  // Destructuring `isLoggedIn` from the authentication context
  const { isLoggedIn } = useAuth();

  // State to manage whether the splash screen is visible
  const [showSplash, setShowSplash] = useState(true);

  // useEffect to handle the splash screen timeout
  useEffect(() => {
    // Set a timer to hide the splash screen after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    // Cleanup function to clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // useEffect to handle navigation based on authentication status
  useEffect(() => {
    // Once the splash screen is hidden, navigate based on login status
    if (!showSplash) {
      if (isLoggedIn) {
        // Redirect to the home page if the user is logged in
        router.replace("/app/home");
      } else {
        // Redirect to the onboarding page if the user is not logged in
        router.replace("/onboarding/one");
      }
    }
  }, [showSplash, isLoggedIn, router]); // Dependencies ensure this effect runs when these values change

  return (
    <div className="font-poppins">
      {/* Render the Splash screen if `showSplash` is true, otherwise render the main app content */}
      {showSplash ? (
        <Splash />
      ) : (
        <div className="overflow-x-hidden">
          {/* Slot component is used to render the current route's content */}
          <Slot />
        </div>
      )}
    </div>
  );
};

// App component wraps the MainApp with context providers
const App = () => (
  <AuthProvider>
    {/* Provides authentication context to the application */}
    <ThemeProvider>
      {/* Provides theme context to the application */}
      <MainApp />
    </ThemeProvider>
  </AuthProvider>
);

// Exporting the App component as the default export
export default App;
