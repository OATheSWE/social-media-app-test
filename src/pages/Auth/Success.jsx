import React from "react";
import { motion } from "framer-motion"; // Importing motion for animations
import { containerVariants, itemVariants, pageTransitionX } from "../../../constants"; // Importing animation variants and transitions
import { Touchable } from "../../components"; // Importing a custom Touchable component
import { router } from "expo-router"; // Importing router for navigation
import { ImageCollection } from "../../../assets"; // Importing image assets

const Success = () => {
    return (
        // Main container with page transition animations
        <motion.div
            className="h-screen bg-white max-lg:pb-20 pt-10" // Full-screen height with padding and background color
            initial={pageTransitionX.initial} // Initial animation state
            animate={pageTransitionX.animate} // Animation state when component is mounted
            exit={pageTransitionX.exit} // Animation state when component is unmounted
            transition={pageTransitionX.transition} // Transition configuration
        >
            {/* Inner container for content, centered and responsive */}
            <motion.div
                className="p-6 h-screen max-w-2xl mx-auto flex flex-col items-center" // Centered content with padding and max width
                variants={containerVariants} // Animation variants for the container
                initial="hidden" // Initial animation state for the container
                animate="visible" // Animation state when container is visible
            >
                {/* Image section */}
                <motion.div className="" variants={itemVariants}>
                    <img 
                        src={ImageCollection.success} // Success image source
                        alt="confirm" // Alternative text for accessibility
                        className="w-full max-w-[400px] max-h-[400px] h-full mb-4" // Responsive image styling
                    />
                </motion.div>

                {/* Welcome text section */}
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl font-bold my-4 text-center text-accent2">
                        Welcome {/* Heading text */}
                    </h1>
                </motion.div>

                {/* Button section */}
                <motion.div variants={itemVariants} className="w-full">
                    <Touchable>
                        <button
                            type="submit" // Button type
                            className="btn bg-accent2 text-white rounded-xl w-full h-12 mt-4" // Button styling
                            onClick={() => router.push("/auth/login")} // Navigate to login page on click
                        >
                            Submit {/* Button text */}
                        </button>
                    </Touchable>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Success; // Exporting the Success component
