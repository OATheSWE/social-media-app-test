import React from "react";
import { Heart, MessageCircle } from "lucide-react";
import Touchable from "./Touchable";
import { router } from "expo-router";

// PostCard component to display a social media post with user details, content, and reactions
const PostCard = ({
  profilePic, // URL of the user's profile picture
  username, // Username of the post creator
  timeAgo, // Time since the post was created
  text, // Text content of the post
  image, // Image associated with the post
  likedByPics = [], // Array of profile picture URLs of users who liked the post
  likedByName = "Someone", // Name of one user who liked the post
  totalLikes = 0, // Total number of likes on the post
  totalComments = 0, // Total number of comments on the post
  id, // Unique identifier for the post
}) => {
  return (
    <div className="card bg-[#ECEBF1] shadow-md rounded-box p-4 max-w-md w-full">
      {/* Header Section: Displays user profile picture, username, and time since post */}
      <Touchable
        onClick={() => {
          // Navigate to the influencer's profile page when the header is clicked
          router.push(`/app/influencer-profile?username=${username}`);
        }}
      >
        <div className="flex items-center space-x-3">
          {/* User's Profile Picture */}
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={profilePic} alt={username} />
            </div>
          </div>
          {/* Username and Time Ago */}
          <div>
            <h2 className="font-bold text-lg text-black">{username}</h2>
            <p className="text-sm text-black">{timeAgo}</p>
          </div>
        </div>
      </Touchable>

      {/* Text Content Section: Displays the main text of the post */}
      <p className="mt-4 text-sm text-black">{text}</p>

      {/* Post Image Section: Displays the image associated with the post */}
      <div className="mt-4 rounded-xl overflow-hidden">
        <img src={image} alt="post" className="w-full object-cover" />
      </div>

      {/* Reactions Section: Displays likes, comments, and user avatars */}
      <div className="mt-4 flex justify-between items-center">
        {/* Avatars and Likes */}
        <div className="flex items-center space-x-2">
          {/* Display up to 3 profile pictures of users who liked the post */}
          <div className="flex -space-x-4">
            {likedByPics.slice(0, 3).map((pic, idx) => (
              <div className="avatar" key={idx}>
                <div className="w-8 rounded-full border-2 border-white">
                  <img src={pic} />
                </div>
              </div>
            ))}
          </div>
          {/* Text showing who liked the post and the total number of likes */}
          <p className="text-sm text-black">
            Liked by <span className="font-semibold">{likedByName}</span> and{" "}
            <span className="font-semibold">{totalLikes} others</span>
          </p>
        </div>

        {/* Icons for Likes and Comments */}
        <div className="flex items-center space-x-4">
          {/* Like Icon and Count */}
          <div className="flex items-center text-red-600">
            <Heart className="w-5 h-5 mr-1" fill="currentColor" />
            <span className="text-sm">{totalLikes}</span>
          </div>
          {/* Comment Icon and Count */}
          <div className="flex items-center text-black">
            <MessageCircle className="w-5 h-5 mr-1" />
            <span className="text-sm">{totalComments}</span>
          </div>
        </div>
      </div>

      {/* Comments Link: Navigates to the comments page for the post */}
      <Touchable
        className="mt-2 text-sm text-black"
        onClick={() => {
          // Navigate to the comments page with the post ID as a query parameter
          router.push(`/app/all-comments?id=${id}`);
        }}
      >
        View all {totalComments} comments
      </Touchable>
    </div>
  );
};

export default PostCard;
