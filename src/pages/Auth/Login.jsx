import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { pageTransitionX } from "../../../constants";
import { AlertError, AlertSuccess, Touchable } from "../../components";
import { router } from "expo-router";
import LoadingOverlay from "../../components/Loading-Screen";
import axios from "axios";
import { useAuth } from "@/src/context/AuthContext";
import CryptoJS from "crypto-js";

export default function Login() {
    // State variables to manage form inputs, processing state, and messages
    const [usernameOrEmail, setUsernameOrEmail] = useState(""); // Stores the username or email entered by the user
    const [password, setPassword] = useState(""); // Stores the password entered by the user
    const [processing, setProcessing] = useState(false); // Indicates if the login process is ongoing
    const [successMessage, setSuccessMessage] = useState(null); // Stores success messages
    const [error, setError] = useState(null); // Stores error messages
    const [showPassword, setShowPassword] = useState(false); // Toggles password visibility
    const { login } = useAuth(); // Custom hook to access authentication context

    // Utility function to simulate a delay
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Handles the login process when the form is submitted
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        setProcessing(true); // Sets the processing state to true
        setError(null); // Clears any previous error messages
        setSuccessMessage(null); // Clears any previous success messages

        try {
            // Determine if the input is an email or username
            const queryKey = usernameOrEmail.includes("@") ? "email" : "username";

            // Fetch user data from the backend based on the input
            const response = await axios.get(
                `http://localhost:3001/users?${queryKey}=${usernameOrEmail}`
            );

            const users = response.data; // Extract the user data from the response

            await sleep(800); // Simulate a delay for better user experience

            if (users.length === 0) {
                // If no users are found, display an error message
                setError("User not found.");
            } else {
                const user = users[0]; // Get the first user from the response

                console.log(user); // Log the user data for debugging purposes

                if (user.password === password) {
                    // Check if the entered password matches the user's password
                    login(user.id); // Call the login function from the authentication context

                    // Encrypt the user ID using a secret key
                    const secretKey = process.env.EXPO_PUBLIC_SECRET_KEY;
                    const encryptedId = CryptoJS.AES.encrypt(
                        user.id.toString(),
                        secretKey
                    ).toString();

                    // Store the encrypted user ID in localStorage
                    localStorage.setItem("user_id", encryptedId);

                    setSuccessMessage("Login successful"); // Display a success message
                    setTimeout(() => {
                        router.push("/app/home"); // Redirect the user to the home page after a delay
                    }, 1000);
                } else {
                    // If the password is incorrect, display an error message
                    setError("Incorrect password.");
                }
            }
        } catch (err) {
            // Handle any unexpected errors during the login process
            setError("An unexpected error occurred.");
        } finally {
            setProcessing(false); // Reset the processing state
        }
    };

    return (
        <motion.div
            className="bg-white min-h-screen flex items-center justify-center relative p-6"
            initial={pageTransitionX.initial} // Initial animation state
            animate={pageTransitionX.animate} // Animation state when the component is mounted
            exit={pageTransitionX.exit} // Animation state when the component is unmounted
            transition={pageTransitionX.transition} // Transition configuration
        >
            {/* Back button to navigate to the onboarding page */}
            <Touchable
                onClick={() => router.push("/onboarding/one")}
                className="fixed top-10 left-5 h-10 w-10 bg-gray-200 rounded-full flex justify-center items-center"
            >
                <ChevronLeft className="h-8 w-8 mr-1 text-black" />
            </Touchable>

            {/* Login form container */}
            <div className="w-full max-w-md bg-white">
                <h2 className="text-2xl text-left font-bold text-[#151515] mb-2">
                    Welcome Back,
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                    We’re happy to see you again, enter your details.
                </p>

                {/* Login form */}
                <form
                    onSubmit={handleLogin} // Attach the login handler to the form submission
                    className="flex flex-col gap-4 mt-4 justify-center items-center"
                >
                    {/* Input field for username or email */}
                    <label className="input-field outline-accent2 w-full">
                        <span>Username or Email</span>
                        <input
                            type="text"
                            value={usernameOrEmail} // Bind the input value to the state
                            onChange={(e) => setUsernameOrEmail(e.target.value)} // Update the state on input change
                            required
                            placeholder="Username or Email"
                        />
                    </label>

                    {/* Input field for password */}
                    <label className="input-field outline-accent2 w-full">
                        <span>Password</span>
                        <input
                            type={showPassword ? "text" : "password"} // Toggle between text and password input types
                            value={password} // Bind the input value to the state
                            onChange={(e) => setPassword(e.target.value)} // Update the state on input change
                            placeholder="Password"
                            className="pr-10"
                            required
                        />
                        {/* Button to toggle password visibility */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
                            className="absolute inset-y-0 right-5 flex items-center text-gray-500"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" /> // Icon for hiding the password
                            ) : (
                                <Eye className="h-5 w-5" /> // Icon for showing the password
                            )}
                        </button>
                    </label>

                    {/* Submit button */}
                    <Touchable className="w-full">
                        <button
                            type="submit"
                            className="btn bg-accent2 shadow-none border-0 text-white rounded-full mt-4 h-[50px] w-full"
                            disabled={processing} // Disable the button while processing
                        >
                            {processing ? "Logging in..." : "Login"} {/* Show loading text if processing */}
                        </button>
                    </Touchable>
                </form>

                {/* Link to the signup page */}
                <Touchable
                    className="fixed bottom-20 left-1/2 transform -translate-x-1/2"
                    onClick={() => router.push("/auth/signup")}
                >
                    <p className="text-center text-[#817d7d] text-[14px]">
                        Don't have an account?{" "}
                        <span className="underline font-semibold text-accent2 text-[15px]">
                            Register
                        </span>
                    </p>
                </Touchable>
            </div>

            {/* Alerts for success and error messages */}
            <AlertSuccess message={successMessage} />
            <AlertError message={error} />

            {/* Loading overlay displayed during processing */}
            <LoadingOverlay visible={processing} />
        </motion.div>
    );
}
