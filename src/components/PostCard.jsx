import React from "react";
import { Heart, MessageCircle } from "lucide-react";
import Touchable from "./Touchable";
import { router } from "expo-router";

const PostCard = ({
  profilePic,
  username,
  timeAgo,
  text,
  image,
  likedByPics = [],
  likedByName = "Someone",
  totalLikes = 0,
  totalComments = 0,
  id,
}) => {
  return (
    <div className="card bg-[#ECEBF1] shadow-md rounded-box p-4 max-w-md w-full">
      {/* Header */}
      <Touchable
        onClick={() => {
          router.push("/app/influencer-profile");
        }}
      >
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={profilePic} alt={username} />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-lg text-black">{username}</h2>
            <p className="text-sm text-black">{timeAgo}</p>
          </div>
        </div>
      </Touchable>

      {/* Text Content */}
      <p className="mt-4 text-sm text-black">{text}</p>

      {/* Post Image */}
      <div className="mt-4 rounded-xl overflow-hidden">
        <img src={image} alt="post" className="w-full object-cover" />
      </div>

      {/* Reactions */}
      <div className="mt-4 flex justify-between items-center">
        {/* Avatars and Likes */}
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-4">
            {likedByPics.slice(0, 3).map((pic, idx) => (
              <div className="avatar" key={idx}>
                <div className="w-8 rounded-full border-2 border-white">
                  <img src={pic} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-black">
            Liked by <span className="font-semibold">{likedByName}</span> and{" "}
            <span className="font-semibold">{totalLikes} others</span>
          </p>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-red-600">
            <Heart className="w-5 h-5 mr-1" fill="currentColor" />
            <span className="text-sm">{totalLikes}</span>
          </div>
          <div className="flex items-center text-black">
            <MessageCircle className="w-5 h-5 mr-1" />
            <span className="text-sm">{totalComments}</span>
          </div>
        </div>
      </div>

      {/* Comments Link */}
      <Touchable
        className="mt-2 text-sm text-black"
        onClick={() => {
          router.push(`/app/all-comments?id=${id}`);
        }}
      >
        View all {totalComments} comments
      </Touchable>
    </div>
  );
};

export default PostCard;
