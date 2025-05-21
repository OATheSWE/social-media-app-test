import { CircleX } from "lucide-react"; // Importing the CircleX icon from the lucide-react library
import React, { useEffect, useState } from "react"; // Importing React and necessary hooks

// Functional component to display an error alert
export default function AlertError({ message }) {
    const [visible, setVisible] = useState(true); // State to control the visibility of the alert

    useEffect(() => {
        if (message) {
            // If a message is provided, set a timer to hide the alert after 2.5 seconds
            const timer = setTimeout(() => {
                setVisible(false); // Set visibility to false after the timeout
            }, 2500);

            // Cleanup function to clear the timeout when the component unmounts
            // or when the message changes
            return () => clearTimeout(timer);
        }
    }, [message]); // Dependency array ensures the effect runs when the message changes

    // If no message is provided or the alert is not visible, render nothing
    if (!message || !visible) return null;

    return (
        <div
            role="alert" // Accessibility role to indicate this is an alert
            className="fixed top-5 w-[calc(100%-2rem)] left-1/2 -translate-x-1/2 z-50 alert alert-error shadow-lg" // Tailwind CSS classes for styling and positioning
            style={{
                maxWidth: "90%", // Ensures the alert does not exceed 90% of the screen width
                animation: "fadeIn 0.5s ease-in-out", // Adds a fade-in animation
            }}
        >
            {/* Inline CSS for the fade-in animation */}
            <style>
                {`
                    @keyframes fadeIn {
                        0% { opacity: 0; transform: translateY(-20px); } /* Start with opacity 0 and translate upwards */
                        100% { opacity: 1; transform: translateY(0); } /* End with full opacity and no translation */
                    }
                `}
            </style>
            <CircleX color="black" className="h-6 w-6"/> {/* Icon for the alert */}
            <span>{message}</span> {/* Display the error message */}
        </div>
    );
}
