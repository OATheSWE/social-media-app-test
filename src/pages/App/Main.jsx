import { pageTransitionX } from "@/constants"; // Importing page transition constants
import React, { useState, useEffect } from "react"; // Importing React and hooks
import { AnimatePresence, motion } from "framer-motion"; // Importing animation utilities
import { ArrowUp, Bell, Search, SlidersHorizontal } from "lucide-react"; // Importing icons
import { router } from "expo-router"; // Importing router for navigation
import { AlertError, PostCard, Touchable } from "@/src/components"; // Importing custom components
import axios from "axios"; // Importing axios for API requests

const Main = () => {
  // State variables for managing component state
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state
  const [posts, setPosts] = useState([]); // Stores fetched posts
  const [isRefreshing, setIsRefreshing] = useState(false); // Tracks refresh state
  const [y, setY] = useState(0); // Tracks vertical touch movement
  const [searchQuery, setSearchQuery] = useState(""); // Tracks search input
  const [showFilterMenu, setShowFilterMenu] = useState(false); // Toggles filter menu visibility
  const [filterBy, setFilterBy] = useState(""); // Tracks active filter
  const [showScrollTop, setShowScrollTop] = useState(false); // Toggles scroll-to-top button visibility
  const [error, setError] = useState(null); // Tracks error messages

  // Fetch posts on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3001/posts") // API call to fetch posts
      .then((response) => {
        const postsData = response.data;

        // Simulate loading delay
        setTimeout(() => {
          setPosts(postsData); // Update posts state
          setIsLoading(false); // Set loading to false
        }, 1500);
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error); // Log error
        setError("Failed to fetch posts"); // Set error message
      });
  }, []);

  // Refresh posts (e.g., pull-to-refresh)
  const handleRefresh = () => {
    setIsRefreshing(true); // Set refreshing state
    setTimeout(() => {
      const newPosts = [
        {
          id: posts.length + 1,
          profilePic: "https://randomuser.me/api/portraits/men/70.jpg",
          username: "New User",
          timeAgo: "Just now",
          text: "This is a new post fetched on refresh! #NewPost",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
          likedByPics: [
            "https://randomuser.me/api/portraits/men/71.jpg",
            "https://randomuser.me/api/portraits/women/72.jpg",
          ],
          likedByName: "FreshUser",
          totalLikes: 10,
          totalComments: 2,
        },
      ];
      setPosts([...newPosts, ...posts]); // Prepend new posts
      setIsRefreshing(false); // Reset refreshing state
      setY(0); // Reset vertical touch movement
    }, 1500);
  };

  // Load more posts when scrolling to the bottom
  const handleLoadMore = () => {
    const newPosts = [
      {
        id: posts.length + 1,
        profilePic: "https://randomuser.me/api/portraits/women/80.jpg",
        username: "Infinite User",
        timeAgo: "Just now",
        text: "This is a new post fetched on scroll! #InfiniteScroll",
        image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
        likedByPics: [
          "https://randomuser.me/api/portraits/women/81.jpg",
          "https://randomuser.me/api/portraits/men/82.jpg",
        ],
        likedByName: "ScrollUser",
        totalLikes: 15,
        totalComments: 5,
      },
    ];
    setPosts([...posts, ...newPosts]); // Append new posts
  };

  // Handle scroll events for infinite scrolling and scroll-to-top button
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      handleLoadMore(); // Trigger load more when near bottom
    }
    setShowScrollTop(scrollTop > 200); // Show scroll-to-top button after scrolling down
  };

  // Handle touch movement for pull-to-refresh
  const handleTouchMove = (e) => {
    const touchY = e.touches[0].clientY;
    if (touchY > 30) {
      setY(touchY - 50); // Update vertical touch movement
    }
  };

  // Handle touch end for pull-to-refresh
  const handleTouchEnd = () => {
    if (y > 30) {
      handleRefresh(); // Trigger refresh if pulled down enough
    } else {
      setY(0); // Reset vertical touch movement
    }
  };

  // Helper function to parse time strings into minutes
  const parseTime = (timeAgo) => {
    if (timeAgo.toLowerCase().includes("just")) return 0; // "Just now" = 0 minutes
    const num = parseInt(timeAgo);
    if (timeAgo.includes("hr")) return num * 60; // Convert hours to minutes
    if (timeAgo.includes("min")) return num; // Minutes remain as is
    if (timeAgo.includes("day")) return num * 1440; // Convert days to minutes
    return 9999; // Default for unrecognized formats
  };

  // Sort and filter posts based on user input
  const sortedPosts = [...posts];
  if (filterBy === "likes") {
    sortedPosts.sort((a, b) => b.totalLikes - a.totalLikes); // Sort by likes
  } else if (filterBy === "recent") {
    sortedPosts.sort((a, b) => parseTime(a.timeAgo) - parseTime(b.timeAgo)); // Sort by recency
  }

  const filteredPosts = sortedPosts.filter(
    (post) =>
      post.username.toLowerCase().includes(searchQuery.toLowerCase()) || // Filter by username
      post.text.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by text
  );

  return (
    <motion.div
      className="bg-white dark:bg-accent2 w-full h-screen overflow-x-hidden overflow-y-scroll py-10 px-6"
      initial={pageTransitionX.initial} // Initial animation state
      animate={pageTransitionX.animate} // Animation state
      exit={pageTransitionX.exit} // Exit animation state
      transition={pageTransitionX.transition} // Animation transition
      onScroll={handleScroll} // Scroll event handler
      onTouchMove={handleTouchMove} // Touch move event handler
      onTouchEnd={handleTouchEnd} // Touch end event handler
    >
      <motion.div
        animate={{ y }} // Animate vertical touch movement
        transition={{ type: "spring", stiffness: 300, damping: 30 }} // Smooth spring animation
      >
        {/* Search bar and filter menu */}
        <div className="flex items-center justify-between space-x-2.5 mt-5 relative">
          <label className="input w-full bg-[#ECEBF1] text-[#8E8D93] rounded-[18px] focus:outline-0 focus-within:outline-0">
            <Search /> {/* Search icon */}
            <input
              type="search"
              required
              placeholder="Search by username or hashtag"
              className="text-[#151515] outline-0"
              value={searchQuery} // Bind search input to state
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            />
          </label>

          {/* Filter menu toggle */}
          <div className="relative">
            <Touchable
              className="p-2.5 bg-[#ECEBF1] rounded-full"
              onClick={() => setShowFilterMenu(!showFilterMenu)} // Toggle filter menu
            >
              <SlidersHorizontal className="text-accent2" /> {/* Filter icon */}
            </Touchable>

            {/* Filter menu dropdown */}
            <AnimatePresence>
              {showFilterMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} // Initial animation state
                  animate={{ opacity: 1, y: 0 }} // Animation state
                  exit={{ opacity: 0, y: -10 }} // Exit animation state
                  className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg z-10 text-sm"
                >
                  {[
                    { label: "Most Liked", value: "likes" },
                    { label: "Most Recent", value: "recent" },
                    { label: "Clear Filter", value: "" },
                  ].map(({ label, value }) => (
                    <motion.button
                      key={value}
                      whileTap={{ scale: 0.95 }} // Button tap animation
                      className={`w-full text-left px-4 py-2 transition-colors duration-150 ${
                        filterBy === value
                          ? "bg-gray-200 font-semibold text-accent2" // Active filter styling
                          : "hover:bg-gray-100 text-accent2" // Hover styling
                      }`}
                      onClick={() => {
                        setFilterBy(value); // Update filter
                        setShowFilterMenu(false); // Close menu
                      }}
                    >
                      {label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications button */}
          <Touchable
            className=" bg-[#ECEBF1] border-none rounded-full shadow-none p-2.5"
            onClick={() => {
              router.push("/app/notifications"); // Navigate to notifications page
            }}
          >
            <Bell className="text-accent2" /> {/* Notifications icon */}
          </Touchable>
        </div>

        {/* Posts list */}
        <div className="flex flex-col space-y-4 mt-5 pb-10 md:justify-center items-center">
          {/* Loading or refreshing skeleton */}
          {(isRefreshing || isLoading) &&
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse w-full flex space-x-4 items-center"
              >
                <div className="rounded-lg bg-[#ECEBF1] h-[250px] w-full"></div>
              </div>
            ))}

          {/* Render filtered posts */}
          {!isLoading &&
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                profilePic={post.profilePic}
                username={post.username}
                timeAgo={post.timeAgo}
                text={post.text}
                image={post.image}
                likedByPics={post.likedByPics}
                likedByName={post.likedByName}
                totalLikes={post.totalLikes}
                totalComments={post.totalComments}
                id={post.id}
              />
            ))}
        </div>
      </motion.div>

      {/* Scroll-to-top button */}
      <AnimatePresence>
        {showScrollTop && (
          <Touchable>
            <motion.button
              initial={{ opacity: 0, y: 20 }} // Initial animation state
              animate={{ opacity: 1, y: 0 }} // Animation state
              exit={{ opacity: 0, y: 20 }} // Exit animation state
              transition={{ duration: 0.3 }} // Animation duration
              onClick={() => {
                const container = document.querySelector(".overflow-y-scroll");
                if (container)
                  container.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
              }}
              className="fixed bottom-20 right-6 bg-accent2  text-white p-4 rounded-full shadow-lg z-50"
            >
              <ArrowUp className="w-5 h-5" /> {/* Scroll-to-top icon */}
            </motion.button>
          </Touchable>
        )}
      </AnimatePresence>

      {/* Error alert */}
      <AlertError message={error} /> {/* Display error message if any */}
    </motion.div>
  );
};

export default Main; // Export the Main component
