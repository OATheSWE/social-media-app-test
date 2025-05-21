import React, { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { router } from "expo-router";
import { pageTransitionX } from "../../../constants";
import {
  AlertError,
  AlertSuccess,
  LoadingScreen,
  Touchable,
} from "../../components";
import { Eye, EyeOff } from "lucide-react";

const genderOptions = ["Male", "Female", "Other"];

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    gender: "",
    password: "",
    about: "",
  });

  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Post to json-server endpoint: /users
      const response = await axios.post("http://localhost:3001/users", form);

      await sleep(800);

      if (response.status === 201) {
        setSuccessMessage("Signup successful!");
        setProcessing(false);
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      } else {
        setError("Signup failed. Please try again.");
        setProcessing(false);
      }
    } catch (err) {
      setError("Network or server error.");
      setProcessing(false);
    }
  };

  const handlePasswordChange = (value) => {
    handleChange("password", value);

    const hasCapital = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const isLongEnough = value.length > 6;

    if (!hasCapital || !hasNumber || !isLongEnough) {
      setPasswordError(
        "Password must have at least one capital letter, one number, and be more than 6 characters."
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <motion.div
      className="bg-white min-h-screen flex items-center justify-center relative p-6 shadow-xl border-2"
      initial={pageTransitionX.initial}
      animate={pageTransitionX.animate}
      exit={pageTransitionX.exit}
      transition={pageTransitionX.transition}
    >
      <div className="w-full max-w-md bg-white">
        <h2 className="text-2xl text-left font-bold text-[#151515] mb-2">
          Personal Information,
        </h2>
        <p className="text-sm text-gray-500 mb-6">Fill in your details.</p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-4 justify-center items-center"
        >
          {/* Username */}
          <label className="input-field outline-accent2 w-full">
            <span>Username</span>
            <input
              type="text"
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
              required
              placeholder="Username"
            />
          </label>

          {/* Email */}
          <label className="input-field outline-accent2 w-full">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
              placeholder="Email"
            />
          </label>

          {/* Gender Dropdown */}
          <div className="dropdown w-full relative">
            <label
              className="input-field outline-[#F4400B] w-full cursor-pointer"
              onClick={() => setIsGenderOpen(!isGenderOpen)}
            >
              <span>Gender</span>
              <input
                readOnly
                value={form.gender}
                placeholder="Select Gender - Required"
                required
              />
            </label>
            <AnimatePresence>
              {isGenderOpen && (
                <motion.ul
                  key="gender-dropdown"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full mt-1"
                >
                  {genderOptions.map((g) => (
                    <li key={g}>
                      <button
                        type="button"
                        onClick={() => {
                          handleChange("gender", g);
                          setIsGenderOpen(false);
                        }}
                      >
                        {g}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Password */}
          <label className="input-field outline-accent2 w-full">
            <span>Password</span>
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
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
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}

          {/* About - textarea */}
          <textarea
            value={form.about}
            onChange={(e) => handleChange("about", e.target.value)}
            placeholder="Tell us about yourself"
            required
            className="outline-accent2 outline-2 w-full text-black p-2 rounded-lg"
            rows={4}
          />

          <div>
            <Touchable>
              <button
                type="submit"
                disabled={processing}
                className="btn bg-accent2 text-white rounded-lg border-0 shadow-none w-full h-12 mt-4"
              >
                {processing ? "Processing..." : "Submit"}
              </button>
            </Touchable>

            <Touchable
              className="mt-6"
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
          </div>
        </form>
      </div>

      {/* Alerts and Loader */}
      <AlertSuccess message={successMessage} />
      <AlertError message={error} />
      <LoadingScreen visible={processing} />
    </motion.div>
  );
}
