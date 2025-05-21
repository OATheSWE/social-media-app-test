import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Back, PostCard } from "../../components";
import { pageTransitionX } from "../../../constants";
import { useLocalSearchParams } from "expo-router";

const AllComments = () => {
  // Extract the `id` parameter from the URL using `useLocalSearchParams`
  const { id } = useLocalSearchParams();

  // State to store the post data
  const [post, setPost] = useState(null);

  // State to manage the loading state
  const [loading, setLoading] = useState(true);

  // Fetch the post data when the component mounts or when `id` changes
  useEffect(() => {
    if (!id) return; // If no `id` is provided, exit early

    const fetchPost = async () => {
      try {
        // Fetch all posts from the API
        const res = await axios.get("http://localhost:3001/posts");

        // Find the post that matches the provided `id`
        const foundPost = res.data.find((p) => p.id === Number(id));

        // Update the `post` state with the found post or set it to `null` if not found
        setPost(foundPost || null);
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching posts:", error);
        setPost(null);
      } finally {
        // Set the loading state to `false` once the fetch is complete
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <motion.div
      className="w-full h-full bg-white dark:bg-accent2 lg:flex min-h-screen overflow-hidden"
      initial={pageTransitionX.initial} // Initial animation state
      animate={pageTransitionX.animate} // Animation state when the component is visible
      exit={pageTransitionX.exit} // Animation state when the component is removed
      transition={pageTransitionX.transition} // Transition configuration
    >
      <div className="w-full lg:pt-6 lg:pb-10 px-6 h-screen overflow-y-scroll">
        {/* Back button to navigate to the home page */}
        <div className="w-full my-10">
          <Back route="/app/home" text="Comment" />
        </div>

        {loading ? (
          <>
            {/* Skeleton loader for the PostCard */}
            <div className="border rounded-lg p-4 shadow-lg max-w-xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full bg-base-300 animate-pulse"></div>
                </div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-base-300 rounded w-3/5 animate-pulse"></div>
                  <div className="h-3 bg-base-300 rounded w-1/4 animate-pulse"></div>
                </div>
              </div>
              <div className="h-20 bg-base-300 rounded mb-4 animate-pulse"></div>
              <div className="h-48 bg-base-300 rounded mb-4 animate-pulse"></div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-base-300 animate-pulse"></div>
                <div className="w-10 h-10 rounded-full bg-base-300 animate-pulse"></div>
                <div className="h-4 bg-base-300 rounded flex-1 animate-pulse"></div>
              </div>
            </div>

            {/* Skeleton loader for the comments section */}
            <div className="mt-10 space-y-6 max-w-xl mx-auto">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full bg-base-300 animate-pulse"></div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-base-300 rounded w-1/3 animate-pulse"></div>
                    <div className="h-3 bg-base-300 rounded w-1/5 animate-pulse"></div>
                    <div className="h-6 bg-base-300 rounded w-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : post ? (
          <>
            {/* Render the PostCard with the fetched post data */}
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

            {/* Render the comments section */}
            <AnimatePresence>
              {post.comment?.map((note, index) => (
                <motion.div
                  key={index}
                  className=""
                  initial={{ opacity: 0, y: 20 }} // Initial animation state for each comment
                  animate={{ opacity: 1, y: 0 }} // Animation state when the comment is visible
                  exit={{ opacity: 0, y: -20 }} // Animation state when the comment is removed
                  transition={{
                    delay: index * 0.1, // Staggered animation for each comment
                    duration: 0.4, // Duration of the animation
                  }}
                >
                  <div className="flex items-center gap-3 pt-8">
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        {/* Render the commenter's profile picture */}
                        <img src={note.img} alt={`${note.name} Profile`} />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between items-center w-full">
                        {/* Render the commenter's name */}
                        <p className="text-black dark:text-white">{note.name}</p>
                        {/* Render the time of the comment */}
                        <p className="text-gray-500 text-sm dark:text-white">
                          {note.time}
                        </p>
                      </div>
                      {/* Render the comment text */}
                      <p className="text-gray-500 text-sm dark:text-white">
                        {note.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </>
        ) : (
          // Display a message if the post is not found
          <p className="text-center dark:text-white mt-10">Post not found.</p>
        )}
      </div>
    </motion.div>
  );
};

export default AllComments;
