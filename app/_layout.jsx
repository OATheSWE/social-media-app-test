import "../global.css";
import "../fonts.css";
import "react-phone-input-2/lib/style.css";
import { router, Slot } from "expo-router";
import { useEffect, useState } from "react";
import { Splash } from "../src/pages";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Set a timer to hide the splash screen after 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Navigate to /website after the splash screen is hidden
    if (!showSplash) {
      router.replace("/app/home"); // Use replace to avoid keeping the splash in history
    }
  }, [showSplash, router]);

  return (
    <div className="font-poppins">
      {showSplash ? (
        <Splash />
      ) : (
        <div>
          <div className="overflow-x-hidden">
            <Slot />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
