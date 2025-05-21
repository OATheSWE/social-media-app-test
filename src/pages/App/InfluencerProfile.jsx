import React, { useState, useEffect } from "react";
import axios from "axios";
import { Touchable } from "../../components";
import { containerVariants, itemVariants, pageTransitionX } from "@/constants";
import { motion } from "framer-motion";
import { router, useLocalSearchParams } from "expo-router";

const InfluencerProfile = () => {
    // Extract the `username` parameter from the local search params
    const { username } = useLocalSearchParams();

    // State to manage loading status
    const [isLoading, setIsLoading] = useState(true);
    // State to store influencer details
    const [influencer, setInfluencer] = useState(null);
    // State to store posts related to the influencer
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch influencer and posts data when the component mounts or `username` changes
        async function fetchData() {
            try {
                // Fetch influencers and posts data concurrently
                const [infRes, postsRes] = await Promise.all([
                    axios.get("http://localhost:3001/influencers"),
                    axios.get("http://localhost:3001/posts"),
                ]);

                // Find the influencer matching the `username`
                const foundInfluencer = infRes.data.find(
                    (inf) => inf.username === username
                );
                setInfluencer(foundInfluencer || null); // Set influencer or null if not found

                // Filter posts that belong to the influencer
                const userPosts = postsRes.data.filter(
                    (post) => post.username === username
                );

                // Update the posts state
                setPosts(userPosts);
            } catch (error) {
                // Log error and reset states in case of failure
                console.error("Error fetching data:", error);
                setInfluencer(null);
                setPosts([]);
            } finally {
                // Set loading to false after data fetch completes
                setIsLoading(false);
            }
        }
        fetchData();
    }, [username]); // Dependency array ensures this runs when `username` changes

    return (
        <motion.div
            className="w-full h-full bg-white dark:bg-accent2 min-h-screen overflow-hidden"
            initial={pageTransitionX.initial} // Initial animation state
            animate={pageTransitionX.animate} // Animation state when component is mounted
            exit={pageTransitionX.exit} // Animation state when component is unmounted
            transition={pageTransitionX.transition} // Transition configuration
        >
            {isLoading ? (
                // Loading skeleton displayed while data is being fetched
                <div className="max-w-md mx-auto p-6 font-sans">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-4 items-center">
                            {/* Placeholder for profile image */}
                            <div className="rounded-full w-20 h-20 bg-gray-300 animate-pulse"></div>
                            <div>
                                {/* Placeholder for username */}
                                <div className="h-6 bg-gray-300 animate-pulse w-32 mb-2"></div>
                                {/* Placeholder for region */}
                                <div className="h-4 bg-gray-300 animate-pulse w-24"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-4">
                        {/* Placeholder for about section */}
                        <div className="h-4 bg-gray-300 animate-pulse w-48"></div>
                        {/* Placeholder for follow button */}
                        <div className="btn bg-gray-300 animate-pulse btn-sm rounded-full px-6"></div>
                    </div>

                    <div className="flex justify-between text-center mt-6 border-t border-b py-4">
                        {/* Placeholder for stats (posts, following, followers) */}
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
                        {/* Placeholder for posts grid */}
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
                // Display influencer profile if data is successfully fetched
                <motion.div
                    className="max-w-md mx-auto p-6 font-sans"
                    variants={containerVariants} // Animation variants for container
                    initial="hidden" // Initial animation state
                    animate="visible" // Animation state when component is mounted
                >
                    <motion.div
                        className="flex items-start justify-between"
                        variants={itemVariants} // Animation variants for items
                    >
                        <div className="flex gap-4 items-center">
                            {/* Influencer profile image */}
                            <img
                                src={
                                    influencer.image ||
                                    "https://randomuser.me/api/portraits/women/80.jpg"
                                }
                                alt="Profile"
                                className="rounded-full w-20 h-20 object-cover"
                            />
                            <div>
                                {/* Influencer username */}
                                <h1 className="text-xl font-bold text-black dark:text-white">
                                    {influencer.username}
                                </h1>
                                {/* Influencer region */}
                                <p className="text-sm text-black dark:text-white">
                                    {influencer.region}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex items-center justify-between gap-2 mt-4"
                        variants={itemVariants}
                    >
                        {/* Influencer about section */}
                        <p className="mt-2 text-sm text-black dark:text-white">
                            {influencer.about}
                        </p>
                        {/* Follow button */}
                        <button className="btn bg-accent2 text-white dark:bg-white dark:text-accent2 btn-sm rounded-full px-6">
                            Follow
                        </button>
                    </motion.div>

                    <motion.div
                        className="flex justify-between text-center mt-6 border-t border-b border-black dark:border-white py-4"
                        variants={itemVariants}
                    >
                        {/* Influencer stats: posts, following, followers */}
                        <div>
                            <p className="font-bold text-black dark:text-white">
                                {influencer.posts || posts.length}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-white">Posts</p>
                        </div>
                        <div>
                            <p className="font-bold text-black dark:text-white">
                                {influencer.following || 0}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-white">Following</p>
                        </div>
                        <div>
                            <p className="font-bold text-black dark:text-white">
                                {influencer.followers || 0}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-white">Followers</p>
                        </div>
                    </motion.div>

                    <motion.div className="mt-6" variants={itemVariants}>
                        {/* Influencer posts grid */}
                        <h2 className="font-bold mb-2 text-black dark:text-white">Posts</h2>
                        <div className="grid grid-cols-3 gap-3">
                            {posts.map((post, idx) => (
                                <Touchable
                                    key={idx}
                                    onClick={() => {
                                        // Navigate to the comments page for the selected post
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
                // Display error message if influencer is not found
                <div className="max-w-md mx-auto p-6 font-sans text-center text-red-500">
                    <p>Influencer with username not found.</p>
                </div>
            )}
        </motion.div>
    );
};

export default InfluencerProfile;
