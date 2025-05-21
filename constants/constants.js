import { Home, User } from "lucide-react"; // Importing icons from the lucide-react library

// Animation configuration for horizontal page transitions
export const pageTransitionX = {
    initial: { x: "100%", opacity: 0.5 }, // Initial state: slide in from the right with reduced opacity
    animate: { x: 0, opacity: 1 }, // Final state: fully visible and centered
    exit: { x: "-100%", opacity: 0 }, // Exit state: slide out to the left with no opacity
    transition: {
        type: "spring", // Spring-based animation for a natural feel
        stiffness: 150, // Controls the spring stiffness (higher = faster)
        damping: 20, // Controls the spring damping (higher = less bounce)
        mass: 0.5, // Controls the mass of the spring (affects speed and bounce)
    },
};

// Animation configuration for vertical page transitions
export const pageTransitionY = {
    initial: { y: "100%", opacity: 0.5 }, // Initial state: slide in from the bottom with reduced opacity
    animate: { y: 0, opacity: 1 }, // Final state: fully visible and centered
    exit: { y: "100%", opacity: 0 }, // Exit state: slide out to the bottom with no opacity
    transition: {
        type: "spring", // Spring-based animation for a natural feel
        stiffness: 150, // Controls the spring stiffness (higher = faster)
        damping: 20, // Controls the spring damping (higher = less bounce)
        mass: 0.5, // Controls the mass of the spring (affects speed and bounce)
    },
};

// Variants for a container element to control child animations
export const containerVariants = {
    hidden: { opacity: 0 }, // Initial state: container is fully transparent
    visible: {
        opacity: 1, // Final state: container is fully visible
        transition: {
            staggerChildren: 0.2, // Delay between animations of child elements
        },
    },
};

// Variants for individual items within a container
export const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Initial state: item is transparent and slightly shifted down
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }, // Final state: item is fully visible and in place
};

// Configuration for admin bottom navigation links
export const adminBottomNavLinks = [
    {
        id: "home", // Unique identifier for the link
        label: "Home", // Display label for the link
        icon: Home, // Icon component for the link
        url: "/app/home", // URL path for navigation
    },
    {
        id: "profile", // Unique identifier for the link
        label: "Profile", // Display label for the link
        icon: User, // Icon component for the link
        url: "/app/my-profile", // URL path for navigation
    },
];
