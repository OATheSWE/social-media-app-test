import { pageTransitionX } from "@/constants";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Bell, Search, SlidersHorizontal } from "lucide-react";
import { router } from "expo-router";
import { PostCard, Touchable } from "@/src/components";

const initialPosts = [
  {
    id: 1,
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "Oyin Dolapo",
    timeAgo: "1hr ago",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. #Pharetra",
    image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
    likedByPics: [
      "https://randomuser.me/api/portraits/men/40.jpg",
      "https://randomuser.me/api/portraits/men/41.jpg",
      "https://randomuser.me/api/portraits/men/42.jpg",
    ],
    likedByName: "Blazinshado",
    totalLikes: 247,
    totalComments: 57,
  },
  {
    id: 2,
    profilePic: "https://randomuser.me/api/portraits/women/50.jpg",
    username: "Ada Obi",
    timeAgo: "2hrs ago",
    text: "Had a wonderful time with my friends today! #Fun",
    image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
    likedByPics: [
      "https://randomuser.me/api/portraits/women/52.jpg",
      "https://randomuser.me/api/portraits/women/53.jpg",
    ],
    likedByName: "QueenTee",
    totalLikes: 189,
    totalComments: 34,
  },
];

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(initialPosts);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [y, setY] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterBy, setFilterBy] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
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
      setPosts([...newPosts, ...posts]);
      setIsRefreshing(false);
      setY(0);
    }, 1500);
  };

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
    setPosts([...posts, ...newPosts]);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      handleLoadMore();
    }
    setShowScrollTop(scrollTop > 200);
  };

  const handleTouchMove = (e) => {
    const touchY = e.touches[0].clientY;
    if (touchY > 30) {
      setY(touchY - 50);
    }
  };

  const handleTouchEnd = () => {
    if (y > 30) {
      handleRefresh();
    } else {
      setY(0);
    }
  };

  // Time parser helper
  const parseTime = (timeAgo) => {
    if (timeAgo.toLowerCase().includes("just")) return 0;
    const num = parseInt(timeAgo);
    if (timeAgo.includes("hr")) return num * 60;
    if (timeAgo.includes("min")) return num;
    if (timeAgo.includes("day")) return num * 1440;
    return 9999;
  };

  // Sort and filter
  const sortedPosts = [...posts];
  if (filterBy === "likes") {
    sortedPosts.sort((a, b) => b.totalLikes - a.totalLikes);
  } else if (filterBy === "recent") {
    sortedPosts.sort((a, b) => parseTime(a.timeAgo) - parseTime(b.timeAgo));
  }

  const filteredPosts = sortedPosts.filter(
    (post) =>
      post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      className="bg-white dark:bg-accent2 w-full h-screen overflow-x-hidden overflow-y-scroll py-10 px-6"
      initial={pageTransitionX.initial}
      animate={pageTransitionX.animate}
      exit={pageTransitionX.exit}
      transition={pageTransitionX.transition}
      onScroll={handleScroll}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        animate={{ y }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center justify-between space-x-2.5 mt-5 relative">
          <label className="input w-full bg-[#ECEBF1] text-[#8E8D93] rounded-[18px] focus:outline-0 focus-within:outline-0">
            <Search />
            <input
              type="search"
              required
              placeholder="Search by username or hashtag"
              className="text-[#151515] outline-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>

          <div className="relative">
            <Touchable
              className="p-2.5 bg-[#ECEBF1] rounded-full"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <SlidersHorizontal className="text-accent2" />
            </Touchable>

            <AnimatePresence>
              {showFilterMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg z-10 text-sm"
                >
                  {[
                    { label: "Most Liked", value: "likes" },
                    { label: "Most Recent", value: "recent" },
                    { label: "Clear Filter", value: "" },
                  ].map(({ label, value }) => (
                    <motion.button
                      key={value}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full text-left px-4 py-2 transition-colors duration-150 ${
                        filterBy === value
                          ? "bg-gray-200 font-semibold text-accent2"
                          : "hover:bg-gray-100 text-accent2"
                      }`}
                      onClick={() => {
                        setFilterBy(value);
                        setShowFilterMenu(false);
                      }}
                    >
                      {label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Touchable
            className=" bg-[#ECEBF1] border-none rounded-full shadow-none p-2.5"
            onClick={() => {
              router.push("/app/notifications");
            }}
          >
            <Bell className="text-accent2" />
          </Touchable>
        </div>

        <div className="flex flex-col space-y-4 mt-5 pb-10 md:justify-center items-center">
          {(isRefreshing || isLoading) &&
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex space-x-4 items-center"
              >
                <div className="rounded-lg bg-[#ECEBF1] h-[250px] w-full"></div>
              </div>
            ))}

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
              />
            ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {showScrollTop && (
        <Touchable>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              const container = document.querySelector(".overflow-y-scroll");
              if (container) container.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="fixed bottom-20 right-6 bg-accent2  text-white p-4 rounded-full shadow-lg z-50"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </Touchable>
         )} 
      </AnimatePresence>
    </motion.div>
  );
};

export default Main;
