import { CircleCheck } from "lucide-react"; // Importing the CircleCheck icon from the lucide-react library
import React, { useEffect, useState } from "react"; // Importing React and necessary hooks

// Component definition for AlertSuccess
export default function AlertSuccess({ message }) {
    // State to control the visibility of the alert
    const [visible, setVisible] = useState(true);
    
    // useEffect hook to handle the auto-hide functionality of the alert
    useEffect(() => {
        if (message) {
            // Set a timer to hide the alert after 2.5 seconds
            const timer = setTimeout(() => {
                setVisible(false); // Update the visibility state to false
            }, 2500);

            // Cleanup function to clear the timer when the component unmounts
            // or when the message prop changes
            return () => clearTimeout(timer);
        }
    }, [message]); // Dependency array ensures this effect runs when the message changes

    // If there's no message or the alert is not visible, render nothing
    if (!message || !visible) return null;

    // Render the alert component
    return (
        <div
            role="alert" // Accessibility role for screen readers
            className="fixed top-5 w-[calc(100%-2rem)] left-1/2 -translate-x-1/2 z-50 alert alert-success shadow-lg" // Tailwind CSS classes for styling
            style={{
                maxWidth: "90%", // Inline style to limit the maximum width of the alert
                animation: "fadeIn 0.5s ease-in-out", // Apply fade-in animation
            }}
        >
            {/* Inline CSS for the fade-in animation */}
            <style>
                {`
                    @keyframes fadeIn {
                        0% { opacity: 0; transform: translateY(-20px); } /* Start with opacity 0 and move slightly upwards */
                        100% { opacity: 1; transform: translateY(0); } /* End with full opacity and original position */
                    }
                `}
            </style>
            {/* Icon for the alert */}
            <CircleCheck color="black" className="h-6 w-6" />
            {/* Display the message passed as a prop */}
            <span>{message}</span>
        </div>
    );
}
