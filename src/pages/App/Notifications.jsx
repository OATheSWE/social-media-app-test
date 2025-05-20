import React, { useEffect, useState } from "react";
import { Bell, BellIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Back, BottomNav } from "../../components";
import { adminBottomNavLinks, pageTransitionX } from "../../../constants";

// Fake notification API simulation
const fetchNotifications = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: 1,
          text: "10 parents just paid school fees",
          time: "10:40am",
        },
        {
          id: 2,
          text: "New assignment uploaded for Grade 5",
          time: "09:15am",
        },
        {
          id: 3,
          text: "Sports Day rescheduled to May 20",
          time: "Yesterday",
        },
        {
          id: 4,
          text: "Server maintenance completed",
          time: "2 days ago",
        },
        {
          id: 5,
          text: "Server maintenance completed",
          time: "2 days ago",
        },
        {
          id: 4,
          text: "Server maintenance completed",
          time: "2 days ago",
        },
        {
          id: 5,
          text: "Server maintenance completed",
          time: "2 days ago",
        },
        {
          id: 4,
          text: "Server maintenance completed",
          time: "2 days ago",
        },
        {
          id: 5,
          text: "Server maintenance completed",
          time: "2 days ago",
        },
        {
          id: 4,
          text: "Server maintenance completed",
          time: "2 days ago",
        },
        
      ]);
    }, 2000)
  );

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications().then((data) => {
      setNotifications(data);
      setLoading(false);
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
      {/* <div className="max-lg:divider"></div> */}

      <div className="w-full lg:pt-6 lg:pb-10 px-6 h-screen overflow-y-scroll">
        <div className="w-full mb-10">
          <Back route="/app/home" text="Notifications" />
        </div>
        {/* <div className="lg:divider"></div> */}

        {/* Skeleton loading */}
        {loading ? (
          <div className="space-y-4 pt-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
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
                key={note.id}
                className=""
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.4,
                }}
              >
                <div className="flex items-center gap-3 pb-8">
                  <div className="bg-gray-100 rounded-full flex justify-center items-center h-12 w-12">
                    <BellIcon className="text-accent2" />
                  </div>
                  <div>
                    <p className="text-black dark:text-white">{note.text}</p>
                    <p className=" text-gray-500 text-sm dark:text-white">{note.time}</p>
                  </div>
                </div>
                {/* <div className="divider"></div> */}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <BottomNav items={adminBottomNavLinks} />
    </motion.div>
  );
};

export default Notifications;
