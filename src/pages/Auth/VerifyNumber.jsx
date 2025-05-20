import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, pageTransitionX } from "@/constants";
import { Back, Touchable } from "@/src/components";
import { router } from "expo-router";

const VerifyNumber = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
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
        <Back route="/auth/signup" text="" />
      </div>

      <motion.div
        className="p-6 h-[90%] max-w-2xl mx-auto flex flex-col justify-center items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold mb-4 text-black">Verify Number</h1>
          <p className="mb-6 text-gray-500">
            Please enter five digits OTP sent to your whatsapp to continue.
          </p>
        </motion.div>

        <motion.div className="flex space-x-3 mb-6" variants={itemVariants}>
          {otp.map((digit, index) => (
            <motion.input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="input input-bordered border-accent2 rounded-xl bg-accent2 w-14 h-14 text-center text-2xl text-white focus:bg-white focus:text-black"
              initial={{ scale: 0.9 }}
              animate={{ scale: digit ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </motion.div>

        <div>
          <motion.div variants={itemVariants}>
            <Touchable>
              <button
                type="submit"
                className="btn bg-accent2 text-white rounded-lg border-0 shadow-none w-full h-12 mt-4"
                onClick={() => router.push("/auth/personal-info")}
              >
                Submit
              </button>
            </Touchable>
          </motion.div>

          <motion.div className="mt-20" variants={itemVariants}>
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

export default VerifyNumber;
