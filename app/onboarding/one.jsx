import { router } from "expo-router";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { ImageCollection } from "../../assets";
import {
  containerVariants,
  itemVariants,
  pageTransitionX,
} from "../../constants";
import { Touchable } from "../../src/components";

const OnboardingScreenOne = () => {
  return (
   
      <motion.div
        className="flex flex-col items-center justify-between md:justify-center min-h-screen overflow-hidden w-full bg-white p-6"
        initial={pageTransitionX.initial}
        animate={pageTransitionX.animate}
        exit={pageTransitionX.exit}
        transition={pageTransitionX.transition}
      >
        <motion.div
          className="md:flex justify-between items-center overflow-y-scroll h-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Top Image */}
          <motion.div className="w-full" variants={itemVariants}>
            <img
              src={ImageCollection.one}
              alt="Onboarding Image"
              className="w-full h-full max-w-[400px] max-h-[400px] object-cover"
            />
          </motion.div>

          {/* Text Section */}
          <div>
            <motion.div className="mt-6" variants={itemVariants}>
              <p className="text-[20px] font-semibold text-gray-900 mt-2 max-w-[220px] w-full">
                Connect with Friends and Family
              </p>
              <p className="text-[16px] font-medium text-gray-700 mt-2">
                Connecting with Family and Friends provides a sense of belonging
                and security
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex flex-col space-y-3 mt-6 w-full"
              variants={itemVariants}
            >
              <Touchable
                className="w-full"
                onClick={() => {
                  router.push("/onboarding/two");
                }}
              >
                <button className="btn border-0 shadow-none bg-accent2 text-white rounded-md h-[50px] w-full">
                  Next
                </button>
              </Touchable>
              <Touchable
                className="w-full"
                onClick={() => {
                  router.push("/auth/signup");
                }}
              >
                <button className="btn bg-white text-black shadow-none border-2 border-accent2 rounded-md h-[50px] w-full">
                  Skip
                </button>
              </Touchable>
            </motion.div>

            {/* Footer */}
            <motion.div className="mt-6" variants={itemVariants}>
              <Touchable
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
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
  );
};

export default OnboardingScreenOne;
