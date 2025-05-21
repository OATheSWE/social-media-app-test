import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ConfirmModal, Touchable } from "../../components";
import { containerVariants, itemVariants, pageTransitionX } from "@/constants";
import { motion } from "framer-motion";
import { router } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";
import { LogOut, Moon, Sun } from "lucide-react";
import { ThemeContext } from "@/src/context/ThemeContext";

const UserProfile = () => {
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to store user information
  const [user, setUser] = useState(null);
  // State to store user's posts
  const [posts, setPosts] = useState([]);
  // Extract userId and logout function from AuthContext
  const { userId, logout } = useAuth();
  // State to manage modal visibility
  const [modalOpen, setModalOpen] = useState(false);
  // State to manage modal type (e.g., delete confirmation)
  const [modalType, setModalType] = useState(null);
  // Extract theme and toggleTheme function from ThemeContext
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Fetch user and post data when the component mounts or userId changes
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user and post data concurrently
        const [infRes, postsRes] = await Promise.all([
          axios.get("http://localhost:3001/users"),
          axios.get("http://localhost:3001/posts"),
        ]);

        // Find the user based on the userId
        const foundUser = infRes.data.find((inf) => inf.id === userId);
        setUser(foundUser || null);

        // Extract username from the found user
        const username = foundUser?.username || "";

        // Filter posts that belong to the user
        const userPosts = postsRes.data.filter(
          (post) => post.username === username
        );

        // Update posts state with the filtered posts
        setPosts(userPosts);
      } catch (error) {
        // Handle errors by resetting user and posts state
        console.error("Error fetching data:", error);
        setUser(null);
        setPosts([]);
      } finally {
        // Set loading to false after data fetching is complete
        setIsLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  // Function to open the modal and set its type
  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  // Function to handle confirmation in the modal
  const handleConfirm = () => {
    setModalOpen(false);
    // Remove user_id from localStorage and log out
    localStorage.removeItem("user_id");
    logout();
    // Redirect to login page after a short delay
    setTimeout(() => {
      router.push("/auth/login");
    }, 300);
  };

  // Function to handle rejection in the modal
  const handleReject = () => {
    setModalOpen(false);
    setModalType(null);
  };

  return (
    <motion.div
      className="w-full h-full bg-white dark:bg-accent2 min-h-screen overflow-hidden"
      initial={pageTransitionX.initial}
      animate={pageTransitionX.animate}
      exit={pageTransitionX.exit}
      transition={pageTransitionX.transition}
    >
      {isLoading ? (
        // Loading skeleton UI while data is being fetched
        <div className="max-w-md mx-auto p-6 font-sans">
          <div className="flex items-start justify-between">
            <div className="flex gap-4 items-center">
              <div className="rounded-full w-20 h-20 bg-gray-300 animate-pulse"></div>
              <div>
                <div className="h-6 bg-gray-300 animate-pulse w-32 mb-2"></div>
                <div className="h-4 bg-gray-300 animate-pulse w-24"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 mt-4">
            <div className="h-4 bg-gray-300 animate-pulse w-48"></div>
            <div className="btn bg-gray-300 animate-pulse btn-sm rounded-full px-6"></div>
          </div>

          <div className="flex justify-between text-center mt-6 border-t border-b py-4">
            {/* Placeholder for user stats */}
            <div>
              <div className="h-6 bg-gray-300 animate-pulse w-8 mx-auto"></div>
              <div className="h-4 bg-gray-300 animate-pulse w-12 mx-auto"></div>
            </div>
            <div>
              <div className="h-6 bg-gray-300 animate-pulse w-8 mx-auto"></div>
              <div className="h-4 bg-gray-300 animate-pulse w-12 mx-auto"></div>
            </div>
            <div>
              <div className="h-6 bg-gray-300 animate-pulse w-8 mx-auto"></div>
              <div className="h-4 bg-gray-300 animate-pulse w-12 mx-auto"></div>
            </div>
          </div>

          <div className="mt-6">
            <div className="h-6 bg-gray-300 animate-pulse w-24 mb-4"></div>
            <div className="grid grid-cols-3 gap-3">
              {/* Placeholder for user posts */}
              {Array(6)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="w-full h-24 bg-gray-300 animate-pulse rounded-xl"
                  ></div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        // Main content when data is loaded
        <motion.div
          className="max-w-md mx-auto p-6 font-sans"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* User profile header */}
          <motion.div
            className="flex items-center justify-between"
            variants={itemVariants}
          >
            <div className="flex gap-4 items-center">
              <img
                src={
                  user.image ||
                  "https://randomuser.me/api/portraits/women/80.jpg"
                }
                alt="Profile"
                className="rounded-full w-20 h-20 object-cover"
              />
              <div>
                <h1 className="text-xl font-bold text-black dark:text-white">
                  {user.username}
                </h1>
                <p className="text-sm text-black dark:text-white">
                  {user.region || "Lagos, Nigeria"}
                </p>
              </div>
            </div>
            {/* Theme toggle button */}
            <Touchable className="btn btn-ghost btn-sm" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-black dark:text-white" />
              ) : (
                <Moon className="w-5 h-5 text-black dark:text-white" />
              )}
            </Touchable>
          </motion.div>

          {/* User bio */}
          <motion.div
            className="flex items-center justify-between gap-2 mt-4"
            variants={itemVariants}
          >
            <p className="mt-2 text-sm text-black dark:text-white">
              {user.about}
            </p>
          </motion.div>

          {/* User stats */}
          <motion.div
            className="flex justify-between text-center mt-6 border-t border-b border-accent2 dark:border-white py-4"
            variants={itemVariants}
          >
            <div>
              <p className="font-bold text-black dark:text-white">
                {posts.length || 0}
              </p>
              <p className="text-sm text-gray-500 dark:text-white">Posts</p>
            </div>
            <div>
              <p className="font-bold text-black dark:text-white"></p>
                {user.following || 0}
              </p>
              <p className="text-sm text-gray-500 dark:text-white">Following</p>
            </div>
            <div>
              <p className="font-bold text-black dark:text-white">
                {user.followers || 0}
              </p>
              <p className="text-sm text-gray-500 dark:text-white">Followers</p>
            </div>
          </motion.div>

          {/* User posts */}
          <motion.div className="mt-6" variants={itemVariants}>
            <h2 className="font-bold mb-2 text-black dark:text-white">Posts</h2>
            <div className="grid grid-cols-3 gap-3">
              {posts.map((post, idx) => (
                <Touchable
                  key={idx}
                  onClick={() => {
                    router.push(`/app/all-comments?id=${post.id}`);
                  }}
                >
                  <motion.img
                    src={post.image}
                    alt={`Post ${idx + 1}`}
                    className="w-full h-24 object-cover rounded-xl"
                    variants={itemVariants}
                  />
                </Touchable>
              ))}
            </div>
          </motion.div>

          {/* Logout button */}
          <motion.div variants={itemVariants} className="w-full mt-15">
            <Touchable>
              <button
                className="btn bg-red-700 text-white rounded-full w-full h-12 mt-20"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("delete");
                }}
              >
                <LogOut className="mr-5" />
                Logout
              </button>
            </Touchable>
          </motion.div>
        </motion.div>
      )}

      {/* Confirmation modal */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        onReject={handleReject}
        type={modalType}
      />
    </motion.div>
  );
};

export default UserProfile;
