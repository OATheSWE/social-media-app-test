import React from "react"; // Importing React to use JSX and React components
import Touchable from "./Touchable"; // Importing a custom Touchable component
import { ChevronLeft } from "lucide-react"; // Importing a left-chevron icon from the lucide-react library
import { router } from "expo-router"; // Importing the router object from expo-router for navigation

// Back component: A reusable component that displays a back button with an optional title
const Back = ({ route, text }) => {
    return (
        <div className="flex items-center space-x-3">
            {/* Touchable component: A clickable button that navigates to the specified route */}
            <Touchable
                onClick={() => { router.push(route); }} // Navigates to the provided route when clicked
                className="h-10 w-10 bg-gray-200 rounded-full flex justify-center items-center" // Styling for the button
            >
                {/* ChevronLeft icon: A left arrow icon inside the button */}
                <ChevronLeft className="h-8 w-8 mr-1 text-accent2" />
            </Touchable>
            {/* Title text: Displays the provided text as a heading */}
            <h1 className="text-[28px] font-bold text-black dark:text-white">
                {text} {/* Dynamic text passed as a prop */}
            </h1>
        </div>
    );
};

export default Back; // Exporting the Back component for use in other parts of the application
