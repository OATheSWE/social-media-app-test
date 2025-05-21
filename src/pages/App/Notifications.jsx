import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AlertError, Back } from "../../components";
import { pageTransitionX } from "../../../constants";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0";
    axios
      .get("http://localhost:3001/notifications")
      .then((response) => {
        const notificationsData = response.data;

        setTimeout(() => {
          setNotifications(notificationsData);
          setLoading(false);
        }, 1500);
      })
      .catch((error) => {
        console.error("Failed to fetch notifications:", error);
        setError("Failed to fetch notifications");
      });
  }, []);

  return (
    <motion.div
      className="w-full h-full bg-white dark:bg-accent2 lg:flex max-lg:pt-10 min-h-screen overflow-hidden"
      initial={pageTransitionX.initial}
      animate={pageTransitionX.animate}
      exit={pageTransitionX.exit}
      transition={pageTransitionX.transition}
    >
      <div className="w-full lg:pt-6 lg:pb-10 px-6 h-screen overflow-y-scroll">
        <div className="w-full mb-10">
          <Back route="/app/home" text="Notifications" />
        </div>

        {loading ? (
          <div className="space-y-4 pt-5">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="bg-gray-200 rounded-full h-12 w-12" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-2 w-1/2 bg-gray-200 rounded ml-auto"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            {notifications.map((note, index) => (
              <motion.div
                key={`${note.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.4,
                }}
              >
                <div className="flex items-center gap-3 pb-8">
                  <div className="bg-gray-100 rounded-full flex justify-center items-center h-12 w-12 overflow-hidden">
                    {note.img ? (
                      <img
                        src={`https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0`}
                        alt="notification"
                        className="object-cover h-12 w-12 rounded-full"
                      />
                    ) : (
                      <div className="text-accent2">🔔</div> // fallback if no img
                    )}
                  </div>
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

      <AlertError message={error} />
    </motion.div>
  );
};

export default Notifications;
