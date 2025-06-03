import React, { useState, useContext } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FiMail, FiLock, FiArrowRight, FiX } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./../../context/ThemeContext.jsx"
import mockUsers from "../../assets/users.js";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const { darkMode } = useContext(ThemeContext);

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const user = mockUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    setTimeout(() => {
      if (user) {
        setMessage(`Welcome back, ${user.name}! You're now logged in.`);
        // Set loggedInUser in localStorage for Header component to detect
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        navigate("/");
      } else {
        setMessage("Invalid email or password. Please try again.");
      }
      setIsSubmitting(false);
    }, 1500);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google credential:", credentialResponse.credential);
    setMessage("Google login successful! Welcome back.");
  };

  const handleGoogleError = () => {
    setMessage("Google login failed. Please try another method.");
  };

  const dismissMessage = () => setMessage("");

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-surface rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <motion.img
                src={darkMode ? "/logo_light.png" : "/logo.png"}
                alt="Company Logo"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="h-12 mx-auto mb-4"
              />
              <h2 className="text-3xl font-bold text-textPrimary">Welcome Back</h2>
              <p className="mt-2 text-textSecondary">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-textSecondary" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 text-textPrimary placeholder-textSecondary transition duration-200 bg-surface"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-textSecondary" />
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
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 text-textPrimary placeholder-textSecondary transition duration-200 bg-surface"
                />
                {passwordFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-3 bg-background rounded-lg text-sm text-textSecondary"
                  >
                    <Link
                      to="/forgot-password"
                      className="text-primary hover:text-primaryHover text-sm font-medium"
                    >
                      Forgot password?
                    </Link>
                  </motion.div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember"
                    type="checkbox"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-secondary text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-textSecondary"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className={`w-full flex justify-center items-center py-3 px-4 rounded-lg bg-primary hover:bg-primaryHover text-white font-semibold shadow-md transition duration-200 ${
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
                    Signing in...
                  </div>
                ) : (
                  <>
                    Sign In <FiArrowRight className="ml-2" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface text-textSecondary">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                shape="pill"
                theme="filled_blue"
                size="large"
                text="signin_with"
              />
            </div>

            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-6 p-3 rounded-lg text-center font-medium flex justify-between items-center ${
                    message.includes("failed")
                      ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                      : "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                  }`}
                >
                  <span>{message}</span>
                  <button
                    onClick={dismissMessage}
                    className="text-textSecondary hover:text-textPrimary"
                  >
                    <FiX />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-background px-8 py-4 text-center">
            <p className="text-textSecondary">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-primary hover:text-primaryHover font-medium transition duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginForm;