import React, { useState, useEffect } from "react";
import axios from "axios";
import { Touchable } from "../../components";
import { containerVariants, itemVariants, pageTransitionX } from "@/constants";
import { motion } from "framer-motion";
import { router, useLocalSearchParams } from "expo-router";

const InfluencerProfile = () => {
  const { username } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [influencer, setInfluencer] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [infRes, postsRes] = await Promise.all([
          axios.get("http://localhost:3001/influencers"),
          axios.get("http://localhost:3001/posts"),
        ]);

        // Find influencer by username
        const foundInfluencer = infRes.data.find(
          (inf) => inf.username === username
        );
        setInfluencer(foundInfluencer || null);

        // Filter posts for the username
        const userPosts = postsRes.data.filter(
          (post) => post.username === username
        );

        // Map posts to image URLs or objects as needed
        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setInfluencer(null);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [username]);

  return (
    <motion.div
      className="w-full h-full bg-white dark:bg-accent2 min-h-screen overflow-hidden"
      initial={pageTransitionX.initial}
      animate={pageTransitionX.animate}
      exit={pageTransitionX.exit}
      transition={pageTransitionX.transition}
    >
      {isLoading ? (
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
      ) : influencer ? (
        <motion.div
          className="max-w-md mx-auto p-6 font-sans"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex items-start justify-between"
            variants={itemVariants}
          >
            <div className="flex gap-4 items-center">
              <img
                src={
                  influencer.image ||
                  "https://randomuser.me/api/portraits/women/80.jpg"
                }
                alt="Profile"
                className="rounded-full w-20 h-20 object-cover"
              />
              <div>
                <h1 className="text-xl font-bold">{influencer.username}</h1>
                <p className="text-sm text-gray-500 dark:text-white">
                  {influencer.region}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center justify-between gap-2 mt-4"
            variants={itemVariants}
          >
            <p className="mt-2 text-sm">{influencer.about}</p>
            <button className="btn bg-accent2 text-white dark:bg-white dark:text-accent2 btn-sm rounded-full px-6">
              Follow
            </button>
          </motion.div>

          <motion.div
            className="flex justify-between text-center mt-6 border-t border-b py-4"
            variants={itemVariants}
          >
            <div>
              <p className="font-bold">{influencer.posts || posts.length}</p>
              <p className="text-sm text-gray-500 dark:text-white">Posts</p>
            </div>
            <div>
              <p className="font-bold">{influencer.following || 0}</p>
              <p className="text-sm text-gray-500 dark:text-white">Following</p>
            </div>
            <div>
              <p className="font-bold">{influencer.followers || 0}</p>
              <p className="text-sm text-gray-500 dark:text-white">Followers</p>
            </div>
          </motion.div>

          <motion.div className="mt-6" variants={itemVariants}>
            <h2 className="font-bold mb-2">Posts</h2>
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
        </motion.div>
      ) : (
        <div className="max-w-md mx-auto p-6 font-sans text-center text-red-500">
          <p>Influencer with username not found.</p>
        </div>
      )}
    </motion.div>
  );
};

export default InfluencerProfile;
