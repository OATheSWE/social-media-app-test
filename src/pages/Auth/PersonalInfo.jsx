import React, { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { router } from "expo-router";
import { pageTransitionX } from "../../../constants";
import {
    AlertError,
    AlertSuccess,
    LoadingScreen,
    Touchable,
} from "../../components";
import { Eye, EyeOff } from "lucide-react";

// Define gender options for the dropdown
const genderOptions = ["Male", "Female", "Other"];

export default function Signup() {
    // State to manage form inputs
    const [form, setForm] = useState({
        username: "",
        email: "",
        gender: "",
        password: "",
        about: "",
    });

    // State to manage dropdown visibility
    const [isGenderOpen, setIsGenderOpen] = useState(false);
    // State to manage loading state during form submission
    const [processing, setProcessing] = useState(false);
    // State to display success message
    const [successMessage, setSuccessMessage] = useState(null);
    // State to display error message
    const [error, setError] = useState(null);
    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    // State to validate and display password errors
    const [passwordError, setPasswordError] = useState("");

    // Function to handle changes in form inputs
    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    // Utility function to simulate a delay
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setProcessing(true); // Set loading state
        setError(null); // Clear previous errors
        setSuccessMessage(null); // Clear previous success messages

        try {
            // Send a POST request to the server to create a new user
            const response = await axios.post("http://localhost:3001/users", form);

            await sleep(800); // Simulate a delay for better UX

            if (response.status === 201) {
                // If the response is successful, show success message
                setSuccessMessage("Signup successful!");
                setProcessing(false);
                // Redirect to login page after a short delay
                setTimeout(() => {
                    router.push("/auth/login");
                }, 1000);
            } else {
                // Handle unexpected response status
                setError("Signup failed. Please try again.");
                setProcessing(false);
            }
        } catch (err) {
            // Handle network or server errors
            setError("Network or server error.");
            setProcessing(false);
        }
    };

    // Function to handle password input changes and validation
    const handlePasswordChange = (value) => {
        handleChange("password", value);

        // Password validation rules
        const hasCapital = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const isLongEnough = value.length > 6;

        // Set error message if validation fails
        if (!hasCapital || !hasNumber || !isLongEnough) {
            setPasswordError(
                "Password must have at least one capital letter, one number, and be more than 6 characters."
            );
        } else {
            setPasswordError(""); // Clear error if validation passes
        }
    };

    return (
        <motion.div
            className="bg-white min-h-screen flex items-center justify-center relative p-6 shadow-xl border-2"
            initial={pageTransitionX.initial} // Initial animation state
            animate={pageTransitionX.animate} // Animation state on mount
            exit={pageTransitionX.exit} // Animation state on unmount
            transition={pageTransitionX.transition} // Animation transition settings
        >
            <div className="w-full max-w-md bg-white">
                {/* Page Header */}
                <h2 className="text-2xl text-left font-bold text-[#151515] mb-2">
                    Personal Information,
                </h2>
                <p className="text-sm text-gray-500 mb-6">Fill in your details.</p>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 mt-4 justify-center items-center"
                >
                    {/* Username Input */}
                    <label className="input-field outline-accent2 w-full">
                        <span>Username</span>
                        <input
                            type="text"
                            value={form.username}
                            onChange={(e) => handleChange("username", e.target.value)}
                            required
                            placeholder="Username"
                        />
                    </label>

                    {/* Email Input */}
                    <label className="input-field outline-accent2 w-full">
                        <span>Email</span>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                            placeholder="Email"
                        />
                    </label>

                    {/* Gender Dropdown */}
                    <div className="dropdown w-full relative">
                        <label
                            className="input-field outline-[#F4400B] w-full cursor-pointer"
                            onClick={() => setIsGenderOpen(!isGenderOpen)} // Toggle dropdown visibility
                        >
                            <span>Gender</span>
                            <input
                                readOnly
                                value={form.gender}
                                placeholder="Select Gender - Required"
                                required
                            />
                        </label>
                        <AnimatePresence>
                            {isGenderOpen && (
                                <motion.ul
                                    key="gender-dropdown"
                                    initial={{ opacity: 0, y: -5 }} // Initial animation state
                                    animate={{ opacity: 1, y: 0 }} // Animation state on mount
                                    exit={{ opacity: 0, y: -5 }} // Animation state on unmount
                                    transition={{ duration: 0.2 }} // Animation duration
                                    className="absolute dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full mt-1"
                                >
                                    {/* Render gender options */}
                                    {genderOptions.map((g) => (
                                        <li key={g}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    handleChange("gender", g); // Update gender field
                                                    setIsGenderOpen(false); // Close dropdown
                                                }}
                                            >
                                                {g}
                                            </button>
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Password Input */}
                    <label className="input-field outline-accent2 w-full">
                        <span>Password</span>
                        <input
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            value={form.password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            placeholder="Password"
                            className="pr-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                            className="absolute inset-y-0 right-5 flex items-center text-gray-500"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" /> // Icon for hiding password
                            ) : (
                                <Eye className="h-5 w-5" /> // Icon for showing password
                            )}
                        </button>
                    </label>
                    {/* Display password validation error */}
                    {passwordError && (
                        <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                    )}

                    {/* About Textarea */}
                    <textarea
                        value={form.about}
                        onChange={(e) => handleChange("about", e.target.value)}
                        placeholder="Tell us about yourself"
                        required
                        className="outline-accent2 outline-2 w-full text-black p-2 rounded-lg"
                        rows={4}
                    />

                    {/* Submit Button */}
                    <div>
                        <Touchable>
                            <button
                                type="submit"
                                disabled={processing} // Disable button while processing
                                className="btn bg-accent2 text-white rounded-lg border-0 shadow-none w-full h-12 mt-4"
                            >
                                {processing ? "Processing..." : "Submit"} {/* Show loading state */}
                            </button>
                        </Touchable>

                        {/* Redirect to Login */}
                        <Touchable
                            className="mt-6"
                            onClick={() => {
                                router.push("/auth/login");
                            }}
                        >
                            <p className="text-center text-black text-[14px]">
                                Already have an account?{" "}
                                <span className="underline font-semibold text-accent2 text-[15px]">
                                    Sign In
                                </span>
                            </p>
                        </Touchable>
                    </div>
                </form>
            </div>

            {/* Alerts and Loader */}
            <AlertSuccess message={successMessage} /> {/* Success alert */}
            <AlertError message={error} /> {/* Error alert */}
            <LoadingScreen visible={processing} /> {/* Loading screen */}
        </motion.div>
    );
}
