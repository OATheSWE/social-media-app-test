import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, pageTransitionX } from "@/constants";
import { AlertError, AlertSuccess, Back, LoadingScreen, Touchable } from "@/src/components";
import { router } from "expo-router";
import axios from "axios";

const VerifyNumber = () => {
    // State to store the OTP digits as an array
    const [otp, setOtp] = useState(["", "", "", "", ""]);
    // Ref to manage focus on input fields
    const inputsRef = useRef([]);
    // State to manage loading spinner visibility
    const [loading, setLoading] = useState(false);
    // State to display error messages
    const [error, setError] = useState("");
    // State to display success messages
    const [success, setSuccess] = useState("");

    // Handles changes in OTP input fields
    const handleChange = (value, index) => {
        // Allow only numeric input
        if (!/^[0-9]?$/.test(value)) return;

        // Update the OTP array with the new value
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Automatically move focus to the next input field if not the last one
        if (value && index < 4) {
            inputsRef.current[index + 1].focus();
        }
    };

    // Handles backspace key to move focus to the previous input field
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    // Utility function to simulate a delay
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Function to verify the entered OTP code
    const verifyCode = async () => {
        setLoading(true); // Show loading spinner

        try {
            // Fetch the verification code from the server
            const response = await axios.get("http://localhost:3001/verification");
            const data = response.data;
            const enteredCode = otp.join(""); // Combine OTP digits into a single string

            await sleep(500); // Simulate a delay for better UX

            // Check if the entered code matches the server-provided code
            if (enteredCode === data.code) {
                setSuccess("Phone number verified successfully!"); // Show success message
                setError(""); // Clear any previous error messages
                setLoading(false); // Hide loading spinner
                setTimeout(() => {
                    router.push("/auth/personal-info"); // Navigate to the next page
                }, 1000);
            } else {
                setError("Incorrect code."); // Show error message for incorrect code
                setSuccess(""); // Clear any previous success messages
                setLoading(false); // Hide loading spinner
            }
        } catch (err) {
            console.error("API error:", err.message); // Log API error for debugging
            setError("Network error."); // Show error message for network issues
            setSuccess(""); // Clear any previous success messages
            setLoading(false); // Hide loading spinner
        }
    };

    return (
        <motion.div
            className="h-screen bg-white max-lg:pb-20"
            initial={pageTransitionX.initial} // Initial animation state
            animate={pageTransitionX.animate} // Animation state on mount
            exit={pageTransitionX.exit} // Animation state on unmount
            transition={pageTransitionX.transition} // Animation transition settings
        >
            {/* Back button to navigate to the previous page */}
            <div className="py-9 px-6 w-full">
                <Back route="/auth/signup" text="" />
            </div>

            <motion.div
                className="p-6 h-[90%] max-w-2xl mx-auto flex flex-col justify-center items-center"
                variants={containerVariants} // Animation variants for the container
                initial="hidden" // Initial animation state
                animate="visible" // Animation state on mount
            >
                {/* Header section */}
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl font-bold mb-4 text-black">Verify Number</h1>
                    <p className="mb-6 text-gray-500">
                        Please enter five digits OTP sent to you to continue.
                    </p>
                </motion.div>

                {/* OTP input fields */}
                <motion.div className="flex space-x-3 mb-6" variants={itemVariants}>
                    {otp.map((digit, index) => (
                        <motion.input
                            key={index} // Unique key for each input field
                            type="text"
                            maxLength="1" // Restrict input to a single character
                            value={digit} // Bind input value to the corresponding OTP digit
                            ref={(el) => (inputsRef.current[index] = el)} // Store input refs for focus management
                            onChange={(e) => handleChange(e.target.value, index)} // Handle input changes
                            onKeyDown={(e) => handleKeyDown(e, index)} // Handle keydown events
                            className="input input-bordered border-accent2 rounded-xl bg-accent2 w-14 h-14 text-center text-2xl text-white focus:bg-white focus:text-black"
                            initial={{ scale: 0.9 }} // Initial animation scale
                            animate={{ scale: digit ? 1.1 : 1 }} // Animate scale based on input value
                            transition={{ type: "spring", stiffness: 300 }} // Spring animation for smooth scaling
                        />
                    ))}
                </motion.div>

                <div>
                    {/* Submit button */}
                    <motion.div variants={itemVariants}>
                        <Touchable>
                            <button
                                type="submit"
                                className="btn bg-accent2 text-white rounded-lg border-0 shadow-none w-full h-12 mt-4"
                                onClick={verifyCode} // Trigger OTP verification on click
                            >
                                Submit
                            </button>
                        </Touchable>
                    </motion.div>

                    {/* Link to navigate to the login page */}
                    <motion.div className="mt-20" variants={itemVariants}>
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

            {/* Success alert */}
            <AlertSuccess message={success} />
            {/* Error alert */}
            <AlertError message={error} />
            {/* Loading spinner */}
            <LoadingScreen visible={loading} />
        </motion.div>
    );
};

export default VerifyNumber;
