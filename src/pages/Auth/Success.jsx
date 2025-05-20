import React from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, pageTransitionX } from "../../../constants";
import { Touchable } from "../../components";
import { router } from "expo-router";
import { ImageCollection } from "../../../assets";




const Success = () => {
    return (
        <motion.div
            className="h-screen bg-white max-lg:pb-20 pt-10"
            initial={pageTransitionX.initial}
            animate={pageTransitionX.animate}
            exit={pageTransitionX.exit}
            transition={pageTransitionX.transition}
        >

            <motion.div
                className="p-6 h-screen max-w-2xl mx-auto flex flex-col items-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="" variants={itemVariants}>
                    <img src={ImageCollection.success} alt="confirm" className="w-full max-w-[400px] max-h-[400px] h-full mb-4" />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl font-bold my-4 text-center text-accent2">Welcome</h1>
                </motion.div>

                <motion.div variants={itemVariants} className="w-full">
                    <Touchable>
                        <button
                            type="submit"
                            className="btn bg-accent2 text-white rounded-xl w-full h-12 mt-4"
                            onClick={() => router.push("/auth/login")}
                        >
                            Submit
                        </button>
                    </Touchable>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Success;
