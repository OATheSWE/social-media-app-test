import { router } from "expo-router";
import { motion } from "framer-motion";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import {
  containerVariants,
  itemVariants,
  pageTransitionX,
} from "../../../constants";
import { Back, LoadingScreen, Touchable } from "../../components";

const Signup = () => {
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/auth/verify-number");
    }, 500);
  };

  return (
    <motion.div
      className="h-screen bg-white max-lg:pb-20"
      initial={pageTransitionX.initial}
      animate={pageTransitionX.animate}
      exit={pageTransitionX.exit}
      transition={pageTransitionX.transition}
    >
      <div className="py-9 px-6 w-full">
        <Back route="/onboarding/three" text="" />
      </div>

      <motion.div
        className="p-6 h-[90%] flex flex-col justify-between max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="p-4 pt-6 w-full rounded-xl"
          variants={itemVariants}
        >
          <label className="input-field outline-accent2 w-full text-black">
            <span>Enter your phone number</span>
            <PhoneInput
              country={"ng"}
              value={number}
              onChange={(phone) => setNumber(phone)}
              inputStyle={{
                width: "100%",
                height: "40px",
                border: "none",
                paddingLeft: "48px",
                background: "transparent",
              }}
              buttonStyle={{
                border: "none",
              }}
              required
            />
          </label>
        </motion.div>

        <div>
          <motion.div variants={itemVariants}>
            <Touchable>
              <button
                className="btn bg-accent2 text-white rounded-lg border-0 shadow-none w-full h-12 mt-4"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </Touchable>
          </motion.div>

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

      <LoadingScreen visible={loading} />
    </motion.div>
  );
};

export default Signup;
