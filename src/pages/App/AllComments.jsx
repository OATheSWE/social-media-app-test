import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Back, PostCard } from "../../components";
import { pageTransitionX } from "../../../constants";
import { useLocalSearchParams } from "expo-router";

const AllComments = () => {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await axios.get("http://localhost:3001/posts");
        const foundPost = res.data.find((p) => p.id === Number(id));
        setPost(foundPost || null);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <motion.div
      className="w-full h-full bg-white dark:bg-accent2 lg:flex min-h-screen overflow-hidden"
      initial={pageTransitionX.initial}
      animate={pageTransitionX.animate}
      exit={pageTransitionX.exit}
      transition={pageTransitionX.transition}
    >
      <div className="w-full lg:pt-6 lg:pb-10 px-6 h-screen overflow-y-scroll">
        <div className="w-full my-10">
          <Back route="/app/home" text="Comment" />
        </div>

        {loading ? (
          <>
            {/* Skeleton for PostCard */}
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

            {/* Skeleton for Comments */}
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
            {/* Post Card */}
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

            {/* Comments Section */}
            <AnimatePresence>
              {post.comment?.map((note, index) => (
                <motion.div
                  key={index}
                  className=""
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.4,
                  }}
                >
                  <div className="flex items-center gap-3 pt-8">
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src={note.img} alt={`${note.name} Profile`} />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between items-center w-full">
                        <p className="text-black dark:text-white">{note.name}</p>
                        <p className="text-gray-500 text-sm dark:text-white">
                          {note.time}
                        </p>
                      </div>
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
          <p className="text-center dark:text-white mt-10">Post not found.</p>
        )}
      </div>
    </motion.div>
  );
};

export default AllComments;
