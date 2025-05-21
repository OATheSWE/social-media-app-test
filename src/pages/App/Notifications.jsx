import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AlertError, Back } from "../../components";
import { pageTransitionX } from "../../../constants";

const Notifications = () => {
    // State to store notifications data
    const [notifications, setNotifications] = useState([]);
    // State to manage loading state
    const [loading, setLoading] = useState(true);
    // State to handle errors
    const [error, setError] = useState(null);

    useEffect(() => {
        // Preload an image to improve user experience
        const img = new Image();
        img.src = "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0";

        // Fetch notifications data from the API
        axios
            .get("http://localhost:3001/notifications")
            .then((response) => {
                const notificationsData = response.data;

                // Simulate a delay to show loading state
                setTimeout(() => {
                    setNotifications(notificationsData); // Update notifications state
                    setLoading(false); // Stop loading
                }, 1500);
            })
            .catch((error) => {
                // Log error and set error state
                console.error("Failed to fetch notifications:", error);
                setError("Failed to fetch notifications");
            });
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <motion.div
            className="w-full h-full bg-white dark:bg-accent2 lg:flex max-lg:pt-10 min-h-screen overflow-hidden"
            initial={pageTransitionX.initial} // Initial animation state
            animate={pageTransitionX.animate} // Animation state when component is visible
            exit={pageTransitionX.exit} // Animation state when component is removed
            transition={pageTransitionX.transition} // Animation transition settings
        >
            <div className="w-full lg:pt-6 lg:pb-10 px-6 h-screen overflow-y-scroll">
                {/* Back button to navigate to the home page */}
                <div className="w-full mb-10">
                    <Back route="/app/home" text="Notifications" />
                </div>

                {loading ? (
                    // Show loading skeletons while data is being fetched
                    <div className="space-y-4 pt-5">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 animate-pulse">
                                {/* Circular skeleton for profile image */}
                                <div className="bg-gray-200 rounded-full h-12 w-12" />
                                <div className="flex-1 space-y-2">
                                    {/* Skeleton for notification text */}
                                    <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                                    {/* Skeleton for timestamp */}
                                    <div className="h-2 w-1/2 bg-gray-200 rounded ml-auto"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Render notifications when data is loaded
                    <AnimatePresence>
                        {notifications.map((note, index) => (
                            <motion.div
                                key={`${note.id}-${index}`} // Unique key for each notification
                                initial={{ opacity: 0, y: 20 }} // Initial animation state
                                animate={{ opacity: 1, y: 0 }} // Animation state when visible
                                exit={{ opacity: 0, y: -20 }} // Animation state when removed
                                transition={{
                                    delay: index * 0.1, // Staggered animation for each notification
                                    duration: 0.4, // Animation duration
                                }}
                            >
                                <div className="flex items-center gap-3 pb-8">
                                    {/* Notification image or fallback icon */}
                                    <div className="bg-gray-100 rounded-full flex justify-center items-center h-12 w-12 overflow-hidden">
                                        {note.img ? (
                                            <img
                                                src={`https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0`} // Static image URL
                                                alt="notification"
                                                className="object-cover h-12 w-12 rounded-full"
                                            />
                                        ) : (
                                            <div className="text-accent2">🔔</div> // Fallback icon if no image is provided
                                        )}
                                    </div>
                                    {/* Notification text and timestamp */}
                                    <div>
                                        <p className="text-black dark:text-white">{note.text}</p>
                                        <p className="text-gray-500 text-sm dark:text-white">
                                            {note.time}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Display error message if any */}
            <AlertError message={error} />
        </motion.div>
    );
};

export default Notifications;
