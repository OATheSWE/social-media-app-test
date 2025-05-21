import { router } from "expo-router"; // Importing the router for navigation
import { motion } from "framer-motion"; // Importing motion for animations
import React, { useState } from "react"; // Importing React and useState hook
import PhoneInput from "react-phone-input-2"; // Importing a phone input component
import {
  containerVariants,
  itemVariants,
  pageTransitionX,
} from "../../../constants"; // Importing animation variants and transitions
import { AlertError, Back, LoadingScreen, Touchable } from "../../components"; // Importing custom components

const Signup = () => {
  // State to store the phone number input
  const [number, setNumber] = useState("");
  // State to manage loading state during form submission
  const [loading, setLoading] = useState(false);
  // State to store error messages
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = () => {
    // Check if the phone number is empty
    if (!number) {
      setError("Please enter a valid phone number"); // Set error message
      return; // Exit the function
    }
    setLoading(true); // Show loading screen
    setTimeout(() => {
      setLoading(false); // Hide loading screen
      router.push("/auth/verify-number"); // Navigate to the verification page
    }, 500); // Simulate a delay for the loading state
  };

  return (
    <motion.div
      className="h-screen bg-white max-lg:pb-20" // Full-screen height with white background
      initial={pageTransitionX.initial} // Initial animation state
      animate={pageTransitionX.animate} // Animation state when component is mounted
      exit={pageTransitionX.exit} // Animation state when component is unmounted
      transition={pageTransitionX.transition} // Transition configuration
    >
      {/* Back button to navigate to the previous page */}
      <div className="py-9 px-6 w-full">
        <Back route="/onboarding/three" text="" />
      </div>

      <motion.div
        className="p-6 h-[90%] flex flex-col justify-between max-w-2xl mx-auto" // Main container for the form
        variants={containerVariants} // Animation variants for the container
        initial="hidden" // Initial animation state
        animate="visible" // Animation state when component is visible
      >
        {/* Phone number input field */}
        <motion.div
          className="p-4 pt-6 w-full rounded-xl"
          variants={itemVariants} // Animation variants for the input field
        >
          <label className="input-field outline-accent2 w-full text-black">
            <span>Enter your phone number</span>
            <PhoneInput
              country={"ng"} // Default country code (Nigeria)
              value={number} // Bind the phone number state
              onChange={(phone) => setNumber(phone)} // Update state on input change
              inputStyle={{
                width: "100%", // Full width input
                height: "40px", // Input height
                border: "none", // No border
                paddingLeft: "48px", // Padding for alignment
                background: "transparent", // Transparent background
              }}
              buttonStyle={{
                border: "none", // No border for the country selector button
              }}
              required // Mark the input as required
            />
          </label>
        </motion.div>

        <div>
          {/* Submit button */}
          <motion.div variants={itemVariants}>
            <Touchable>
              <button
                className="btn bg-accent2 text-white rounded-lg border-0 shadow-none w-full h-12 mt-4"
                onClick={handleSubmit} // Call handleSubmit on click
              >
                Submit
              </button>
            </Touchable>
          </motion.div>

          {/* Link to navigate to the login page */}
          <motion.div className="mt-6" variants={itemVariants}>
            <Touchable
              onClick={() => {
                router.push("/auth/login"); // Navigate to the login page
              }}
            >
              <p className="text-center text-black text-[14px]">
                Already have an account?{" "}
                <span className="underline font-semibold text-accent2 text-[15px]">
                  Sign In
                </span>
              </p>
            </Touchable>
          </motion.div>
        </div>
      </motion.div>

      {/* Loading screen component */}
      <LoadingScreen visible={loading} />
      {/* Error alert component */}
      <AlertError message={error} />
    </motion.div>
  );
};

export default Signup; // Export the Signup component
