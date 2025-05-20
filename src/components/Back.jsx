import React from "react";
import Touchable from "./Touchable";
import { ChevronLeft } from "lucide-react";
import { router } from "expo-router";

const Back = ({route, text}) => {
    return (
        <div className=" flex items-center space-x-3">
            <Touchable
                onClick={() => {router.push(route)}}
                className="h-10 w-10 bg-gray-200 rounded-full flex justify-center items-center"
            >
                <ChevronLeft className="h-8 w-8 mr-1 text-accent2" />
            </Touchable>
            <h1 className="text-[28px] font-bold text-black dark:text-white">{text}</h1>
        </div>
    );
};

export default Back;
