import { router } from "expo-router"; // Importing the router for navigation
import { motion } from "framer-motion"; // Importing motion for animations
import React from "react"; // Importing React
import { ImageCollection } from "../../assets"; // Importing image assets
import {
  containerVariants,
  itemVariants,
  pageTransitionX,
} from "../../constants"; // Importing animation variants and transition constants
import { Touchable } from "../../src/components"; // Importing a custom Touchable component

// Functional component for the second onboarding screen
const OnboardingScreenTwo = () => {
  return (
    // Main container with animations for page transitions
    <motion.div
      className="flex flex-col items-center justify-between md:justify-center min-h-screen overflow-hidden w-full bg-white p-6"
      initial={pageTransitionX.initial} // Initial animation state
      animate={pageTransitionX.animate} // Animation state when component is mounted
      exit={pageTransitionX.exit} // Animation state when component is unmounted
      transition={pageTransitionX.transition} // Transition configuration
    >
      {/* Inner container with animations for child elements */}
      <motion.div
        className="md:flex justify-between items-center overflow-y-scroll h-full"
        initial="hidden" // Initial animation state for child elements
        animate="visible" // Animation state when child elements are visible
        variants={containerVariants} // Animation variants for the container
      >
        {/* Top Image Section */}
        <motion.div className="w-full" variants={itemVariants}>
          <img
            src={ImageCollection.two} // Source of the image
            alt="Onboarding Image" // Alt text for accessibility
            className="w-full h-full max-w-[400px] max-h-[400px] object-cover" // Styling for the image
          />
        </motion.div>

        {/* Text Section */}
        <div>
          {/* Title and Description */}
          <motion.div className="mt-6" variants={itemVariants}>
            <p className="text-[20px] font-semibold text-gray-900 mt-2 max-w-[220px] w-full">
              Make new friends with ease {/* Title text */}
            </p>
            <p className="text-[16px] font-medium text-gray-700 mt-2">
              Allowing you to make new Friends is our Number one priority.....
              {/* Description text */}
            </p>
          </motion.div>

          {/* Buttons Section */}
          <motion.div
            className="flex flex-col space-y-3 mt-6 w-full"
            variants={itemVariants}
          >
            {/* Next Button */}
            <Touchable
              className="w-full"
              onClick={() => {
                router.push("/onboarding/three"); // Navigate to the next onboarding screen
              }}
            >
              <button className="btn bg-accent2 border-0 shadow-none text-white rounded-md h-[50px] w-full">
                Next {/* Button text */}
              </button>
            </Touchable>

            {/* Skip Button */}
            <Touchable
              className="w-full"
              onClick={() => {
                router.push("/auth/signup"); // Navigate to the signup screen
              }}
            >
              <button className="btn bg-white shadow-none text-black border-2 border-accent2 rounded-md h-[50px] w-full">
                Skip {/* Button text */}
              </button>
            </Touchable>
          </motion.div>

          {/* Footer Section */}
          <motion.div className="mt-6" variants={itemVariants}>
            {/* Sign In Link */}
            <Touchable
              onClick={() => {
                router.push("/auth/login"); // Navigate to the login screen
              }}
            >
              <p className="text-center text-black text-[14px]">
                Already have an account?{" "}
                <span className="underline font-semibold text-accent2 text-[15px]">
                  Sign In {/* Link text */}
                </span>
              </p>
            </Touchable>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingScreenTwo; // Exporting the component as default
