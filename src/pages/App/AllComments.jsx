import React, { useEffect, useState } from "react";
import { BellIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Back, PostCard } from "../../components";
import { pageTransitionX } from "../../../constants";

// Fake notification API simulation
const fetchAllComments = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: 5,
          text: "Server",
          time: "2 days ago",
          comment:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et natus iusto architecto dolor, ",
        },
        {
          id: 4,
          text: "Server",
          time: "2 days ago",
          comment:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et natus iusto architecto dolor, .",
        },
        {
          id: 5,
          text: "Server",
          time: "2 days ago",
          comment:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et natus iusto architecto dolor, .",
        },
        {
          id: 4,
          text: "Server",
          time: "2 days ago",
          comment:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et natus iusto architecto dolor, ",
        },
        {
          id: 5,
          text: "Server",
          time: "2 days ago",
          comment:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et natus iusto architecto dolor, ",
        },
      ]);
    }, 100)
  );

const AllComments = () => {
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    fetchAllComments().then((data) => {
      setAllComments(data);
    });
  }, []);

  const posts = [
    {
      id: 1,
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

  return (
    <motion.div
      className="w-full h-full bg-white dark:bg-accent2 lg:flex  min-h-screen overflow-hidden"
      initial={pageTransitionX.initial}
      animate={pageTransitionX.animate}
      exit={pageTransitionX.exit}
      transition={pageTransitionX.transition}
    >
      {/* <div className="max-lg:divider"></div> */}

      <div className="w-full lg:pt-6 lg:pb-10 px-6 h-screen overflow-y-scroll">
        <div className="w-full my-10">
          <Back route="/app/home" text="Comment" />
        </div>
        {/* <div className="lg:divider"></div> */}

        {posts.map((post) => (
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

        <AnimatePresence>
          {allComments.map((note, index) => (
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
              <div className="flex items-center gap-3 pt-8">
                <div>
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src="https://randomuser.me/api/portraits/women/80.jpg"
                        alt="Profile Pic"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-black dark:text-white">{note.text}</p>
                    <p className=" text-gray-500 text-sm dark:text-white">
                      {note.time}
                    </p>
                  </div>
                  <p className=" text-gray-500 text-[10px] text-sm dark:text-white">
                    {note.comment}
                  </p>
                </div>
              </div>
              {/* <div className="divider"></div> */}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AllComments;
