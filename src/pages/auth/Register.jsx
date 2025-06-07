import React, { useState, useContext } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FiUser, FiMail, FiLock, FiArrowRight, FiX, FiCheck } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./../../context/ThemeContext.jsx";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const { darkMode } = useContext(ThemeContext);

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Welcome, ${data.firstName}! Account created successfully.`);
        localStorage.setItem('loggedInUser', JSON.stringify(data));
        navigate("/");
      } else {
        setMessage(data.message || "Registration failed. Please try again.");
      }
    } catch {
      setMessage("An error occurred. Please try again.");
    }

    setIsSubmitting(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Google signup successful! Welcome aboard.");
        localStorage.setItem('loggedInUser', JSON.stringify(data));
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage(data.message || "Google signup failed. Please try another method.");
      }
    } catch {
      setMessage("Google signup failed. Please try another method.");
    }
  };

  const handleGoogleError = () => {
    setMessage("Google signup failed. Please try another method.");
  };

  const dismissMessage = () => setMessage("");

  return (
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
<div className={`min-h-screen flex items-center justify-center relative px-4 py-12 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-indigo-100"}`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 0.1, y: 0 }}
              transition={{ duration: 2, delay: i * 0.3 }}
              className={`absolute rounded-full ${darkMode ? "bg-indigo-500" : "bg-indigo-300"}`}
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: "blur(40px)"
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`max-w-md w-full rounded-2xl overflow-hidden shadow-xl ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                className="flex justify-center"
              >
                <div className={`p-3 rounded-full ${darkMode ? "bg-gray-700" : "bg-indigo-50"} mb-6`}>
                  <FiUser className={`h-10 w-10 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`} />
                </div>
              </motion.div>
              <h2 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>Create Account</h2>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Join our community today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-1 relative group">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                    <FiUser className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500" : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"} transition duration-200`}
                  />
                </div>
                <div className="flex-1 relative group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500" : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"} transition duration-200`}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  <FiMail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500" : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"} transition duration-200`}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="relative group"
              >
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  <FiUser className="h-5 w-5" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500" : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"} transition duration-200`}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  <FiLock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500" : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"} transition duration-200`}
                />
                {passwordFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-2 p-3 rounded-lg text-sm ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-600"}`}
                  >
                    <p className="flex items-center mb-1">
                      {formData.password.length >= 8 ? (
                        <FiCheck className="text-green-500 mr-2" />
                      ) : (
                        <FiX className="text-red-500 mr-2" />
                      )}
                      Minimum 8 characters
                    </p>
                    <p className="flex items-center mb-1">
                      {/[A-Z]/.test(formData.password) ? (
                        <FiCheck className="text-green-500 mr-2" />
                      ) : (
                        <FiX className="text-red-500 mr-2" />
                      )}
                      At least one uppercase letter
                    </p>
                    <p className="flex items-center">
                      {/[0-9]/.test(formData.password) ? (
                        <FiCheck className="text-green-500 mr-2" />
                      ) : (
                        <FiX className="text-red-500 mr-2" />
                      )}
                      At least one number
                    </p>
                  </motion.div>
                )}
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className={`w-full flex justify-center items-center py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-medium shadow-md transition duration-200 ${
                  isSubmitting ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  <motion.div
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Register <FiArrowRight className="ml-2" />
                  </motion.div>
                )}
              </motion.button>
            </form>

            <div className="relative my-6">
              <div className={`absolute inset-0 flex items-center ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className={`w-full border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-4 ${darkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-500"}`}>
                  Or continue with
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                shape="pill"
                theme={darkMode ? "filled_black" : "filled_blue"}
                size="large"
                text="signup_with"
              />
            </motion.div>

            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-6 p-4 rounded-lg text-center font-medium flex justify-between items-center ${
                    message.includes("failed")
                      ? `${darkMode ? "bg-red-900/30 text-red-400" : "bg-red-50 text-red-600"}`
                      : `${darkMode ? "bg-green-900/30 text-green-400" : "bg-green-50 text-green-600"}`
                  }`}
                >
                  <span>{message}</span>
                  <button
                    onClick={dismissMessage}
                    className={`${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    <FiX />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`px-8 py-5 text-center ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}
          >
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className={`font-medium transition duration-200 hover:underline ${darkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-500"}`}
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default RegisterForm;
