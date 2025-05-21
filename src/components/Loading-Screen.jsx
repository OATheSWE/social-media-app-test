import React from "react";

// LoadingScreen component to display a loading overlay
export default function LoadingScreen({ visible }) {
    // If the 'visible' prop is false, do not render anything
    if (!visible) return null;

    return (
        // Full-screen overlay with a semi-transparent background
        <div className="fixed inset-0 bg-black opacity-40 flex items-center justify-center z-50">
            {/* Loading spinner with custom styles */}
            <span className="loading loading-bars loading-xl text-accent2"></span>
        </div>
    );
}
