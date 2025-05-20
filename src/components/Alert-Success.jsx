import { CircleCheck } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function AlertSuccess({ message }) {
    const [visible, setVisible] = useState(true);
    
        useEffect(() => {
            if (message) {
                const timer = setTimeout(() => {
                    setVisible(false);
                }, 2500); // Hide alert after 2.5 seconds
    
                // Cleanup timeout on component unmount or if message changes
                return () => clearTimeout(timer);
            }
        }, [message]);
    
        if (!message || !visible) return null;

    return (
        <div
            role="alert"
            className="fixed top-5 w-[calc(100%-2rem)] left-1/2 -translate-x-1/2 z-50 alert alert-success shadow-lg"
            style={{
                maxWidth: "90%",
                animation: "fadeIn 0.5s ease-in-out",
            }}
        >
            <style>
                {`
                    @keyframes fadeIn {
                        0% { opacity: 0; transform: translateY(-20px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                `}
            </style>
            <CircleCheck color="black" className="h-6 w-6"/>
            <span>{message}</span>
        </div>
    );
}
