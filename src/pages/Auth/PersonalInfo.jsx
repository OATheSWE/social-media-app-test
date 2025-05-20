import React, { useState } from "react";
// import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { router } from "expo-router";
import { pageTransitionX } from "../../../constants";
import { AlertError, AlertSuccess, Touchable } from "../../components";
import LoadingOverlay from "../../components/Loading-Screen";

export default function Signup() {
  const [schoolName, setSchoolName] = useState("");
  const [principalName, setPrincipalName] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [logo, setLogo] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  //   const handleSignup = async (e) => {
  //     e.preventDefault();
  //     setProcessing(true);
  //     setError(null);
  //     setSuccessMessage(null);

  //     console.log({
  //       admin_data: {
  //         school_name: schoolName,
  //         principal_name: principalName,
  //         school_email: schoolEmail,
  //         whatsapp_number: whatsappNumber,
  //         logo: logo, // Send logo as file
  //       },
  //     });

  //     try {
  //       const response = await axios.post(`/api/admin/register`, {
  //         admin_data: {
  //           school_name: schoolName,
  //           principal_name: principalName,
  //           school_email: schoolEmail,
  //           whatsapp_number: whatsappNumber,
  //           logo: logo, // Send logo as file
  //         },
  //       });

  //       if (response.status === 201) {
  //         setSuccessMessage(response.data.message || "Signup successful");
  //         setTimeout(() => {
  //           Inertia.visit("/choose-account");
  //         }, 1500);
  //       } else {
  //         setError(
  //           response.data.message ||
  //             "Signup failed. Please check your credentials."
  //         );
  //       }
  //     } catch (err) {
  //       setError(err?.response?.data?.error || "An unexpected error occurred.");
  //     } finally {
  //       setProcessing(false);
  //     }
  //   };

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
          //   onSubmit={handleSignup}
          className="flex flex-col gap-4 mt-4 justify-center items-center"
        >
          <label className="input-field outline-accent2 w-full">
            <span>Username</span>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              required
              placeholder="Username"
            />
          </label>

          <label className="input-field outline-accent2 w-full">
            <span>School Email</span>
            <input
              type="email"
              value={schoolEmail}
              onChange={(e) => setSchoolEmail(e.target.value)}
              required
              placeholder="School Email"
            />
          </label>

          

          
          {/* <div className="dropdown w-full">
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
          </div> */}

          <label className="input-field outline-accent2 w-full">
            <span>School Email</span>
            <input
              type="email"
              value={schoolEmail}
              onChange={(e) => setSchoolEmail(e.target.value)}
              required
              placeholder="School Email"
            />
          </label>

          <label className="input-field outline-accent2 w-full">
            <span>School Email</span>
            <input
              type="email"
              value={schoolEmail}
              onChange={(e) => setSchoolEmail(e.target.value)}
              required
              placeholder="School Email"
            />
          </label>

          

          

          <div>
            <Touchable>
              <button
                type="submit"
                className="btn bg-accent2 text-white rounded-lg border-0 shadow-none w-full h-12 mt-4"
                onClick={() => router.push("/auth/success")}
              >
                Submit
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
      <LoadingOverlay visible={processing} />
    </motion.div>
  );
}
