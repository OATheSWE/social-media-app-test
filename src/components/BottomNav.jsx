import { router } from "expo-router"; // Importing the router from expo-router for navigation
import { useState } from "react"; // Importing useState hook from React to manage component state

// BottomNav component: A bottom navigation bar that takes an array of items as a prop
const BottomNav = ({ items }) => {
    // State to track the currently active navigation item
    const [active, setActive] = useState("/app/home");

    return (
        // Fixed container for the bottom navigation bar
        <div className=" fixed bottom-0 left-0 right-0 bg-white dark:bg-accent2 border-t border-gray-200 shadow-sm z-50">
            {/* Flex container to evenly distribute navigation items */}
            <div className="flex justify-around items-center py-2">
                {/* Loop through the items array to render each navigation button */}
                {items.map((item) => {
                    const Icon = item.icon; // Extract the icon component for the current item
                    const isActive = active === item.id; // Check if the current item is active

                    return (
                        // Button for each navigation item
                        <button
                            key={item.id} // Unique key for each item
                            onClick={() => {
                                setActive(item.id); // Update the active state to the current item's id
                                router.push(item.url); // Navigate to the item's URL
                            }}
                            className="flex flex-col items-center justify-center relative px-4 group cursor-pointer"
                        >
                            {/* Top indicator: A small bar that appears above the active item */}
                            <div
                                className={`absolute -top-2 w-16 h-1 rounded-b-full bg-accent2 dark:bg-white transition-all duration-300 ease-in-out ${
                                    isActive
                                        ? "opacity-100 scale-100" // Fully visible and scaled when active
                                        : "opacity-0 scale-75" // Hidden and scaled down when inactive
                                }`}
                            ></div>

                            {/* Icon: The main visual representation of the navigation item */}
                            <Icon
                                className={`h-6 w-6 transition-colors duration-300 ${
                                    isActive
                                        ? "text-accent2 dark:text-white" // Highlighted color when active
                                        : "text-gray-400" // Dimmed color when inactive
                                }`}
                            />

                            {/* Label: Text label below the icon */}
                            <span
                                className={`text-xs mt-1 transition-colors duration-300 ${
                                    isActive
                                        ? "text-accent2 dark:text-white" // Highlighted color when active
                                        : "text-gray-400" // Dimmed color when inactive
                                }`}
                            >
                                {item.label} {/* Display the label text */}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav; // Exporting the BottomNav component for use in other parts of the app
