import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { pageTransitionX } from "../../../constants";
import { AlertError, AlertSuccess, Touchable } from "../../components";
import { router } from "expo-router";
import LoadingOverlay from "../../components/Loading-Screen";
import axios from "axios";
import { useAuth } from "@/src/context/AuthContext";
import CryptoJS from "crypto-js";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleLogin = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const queryKey = usernameOrEmail.includes("@") ? "email" : "username";
      const response = await axios.get(
        `http://localhost:3001/users?${queryKey}=${usernameOrEmail}`
      );

      const users = response.data;

      await sleep(800);

      if (users.length === 0) {
        setError("User not found.");
      } else {
        const user = users[0];

        console.log(user);

        if (user.password === password) {
          login(user.id);

          const secretKey = process.env.EXPO_PUBLIC_SECRET_KEY;

          const encryptedId = CryptoJS.AES.encrypt(
            user.id.toString(),
            secretKey
          ).toString();

          localStorage.setItem("user_id", encryptedId);

          setSuccessMessage("Login successful");
          setTimeout(() => {
            router.push("/app/home");
          }, 1000);
        } else {
          setError("Incorrect password.");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <motion.div
      className="bg-white min-h-screen flex items-center justify-center relative p-6"
      initial={pageTransitionX.initial}
      animate={pageTransitionX.animate}
      exit={pageTransitionX.exit}
      transition={pageTransitionX.transition}
    >
      <Touchable
        onClick={() => router.push("/onboarding/one")}
        className="fixed top-10 left-5 h-10 w-10 bg-gray-200 rounded-full flex justify-center items-center"
      >
        <ChevronLeft className="h-8 w-8 mr-1 text-black" />
      </Touchable>
      <div className="w-full max-w-md bg-white">
        <h2 className="text-2xl text-left font-bold text-[#151515] mb-2">
          Welcome Back,
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          We’re happy to see you again, enter your details.
        </p>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 mt-4 justify-center items-center"
        >
          <label className="input-field outline-accent2 w-full">
            <span>Username or Email</span>
            <input
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
              placeholder="Username or Email"
            />
          </label>

          <label className="input-field outline-accent2 w-full">
            <span>Password</span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-5 flex items-center text-gray-500"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </label>

          <Touchable className="w-full">
            <button
              type="submit"
              className="btn bg-accent2 shadow-none border-0 text-white rounded-full mt-4 h-[50px] w-full"
              disabled={processing}
            >
              {processing ? "Logging in..." : "Login"}
            </button>
          </Touchable>
        </form>

        <Touchable
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2"
          onClick={() => router.push("/auth/signup")}
        >
          <p className="text-center text-[#817d7d] text-[14px]">
            Don't have an account?{" "}
            <span className="underline font-semibold text-accent2 text-[15px]">
              Register
            </span>
          </p>
        </Touchable>
      </div>

      {/* Alerts and Loader */}
      <AlertSuccess message={successMessage} />
      <AlertError message={error} />
      <LoadingOverlay visible={processing} />
    </motion.div>
  );
}
