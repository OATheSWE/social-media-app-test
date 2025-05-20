import { router } from "expo-router";
import { useState } from "react";

const BottomNav = ({ items }) => {
    const [active, setActive] = useState("app/home");

    return (
        <div className=" fixed bottom-0 left-0 right-0 bg-white dark:bg-accent2 border-t border-gray-200 shadow-sm z-50">
            <div className="flex justify-around items-center py-2">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActive(item.id);
                                router.push(item.url);
                            }}
                            className="flex flex-col items-center justify-center relative px-4 group cursor-pointer"
                        >
                            {/* Top indicator */}
                            <div
                                className={`absolute -top-2 w-16 h-1 rounded-b-full bg-accent2 dark:bg-white transition-all duration-300 ease-in-out ${
                                    isActive
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-75"
                                }`}
                            ></div>

                            {/* Icon */}
                            <Icon
                                className={`h-6 w-6 transition-colors duration-300 ${
                                    isActive
                                        ? "text-accent2 dark:text-white"
                                        : "text-gray-400"
                                }`}
                            />

                            {/* Label */}
                            <span
                                className={`text-xs mt-1 transition-colors duration-300 ${
                                    isActive
                                        ? "text-accent2 dark:text-white"
                                        : "text-gray-400"
                                }`}
                            >
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
