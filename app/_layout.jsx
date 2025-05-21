import "../global.css";
import "../fonts.css";
import "react-phone-input-2/lib/style.css";
import { router, Slot } from "expo-router";
import { useEffect, useState } from "react";
import { Splash } from "../src/pages";
import { AuthProvider, useAuth } from "@/src/context/AuthContext";

const MainApp = () => {
  const { isLoggedIn } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showSplash) {
      if (isLoggedIn) {
        router.replace("/app/home");
      } else {
        router.replace("/onboarding/one");
      }
    }
  }, [showSplash, isLoggedIn, router]);

  return (
    <div className="font-poppins">
      {showSplash ? (
        <Splash />
      ) : (
        <div className="overflow-x-hidden">
          <Slot />
        </div>
      )}
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <MainApp />
  </AuthProvider>
);

export default App;
