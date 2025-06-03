import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  User, // For profile settings
  Lock, // For security
  Save, // For save button

} from 'lucide-react'; // Using Lucide React icons
import toast from 'react-hot-toast'; // Assuming react-hot-toast is installed for notifications

const Settings = () => {
  // Mock user settings data
  const [settings, setSettings] = useState({
    username: 'AfroVogueUser',
    email: 'user@example.com',
    notificationsEnabled: true,
    darkModeEnabled: false, // Assuming initial state is light mode
    password: '', // Not displayed, but for form logic
    confirmPassword: '', // Not displayed, but for form logic
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for the field being typed into
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!settings.username.trim()) {
      newErrors.username = 'Username cannot be empty.';
    }
    if (!settings.email.trim()) {
      newErrors.email = 'Email cannot be empty.';
    } else if (!/\S+@\S+\.\S+/.test(settings.email)) {
      newErrors.email = 'Invalid email format.';
    }

    // Password validation (if fields are present and user intends to change)
    if (settings.password || settings.confirmPassword) {
      if (settings.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters.';
      }
      if (settings.password !== settings.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please correct the errors before saving.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Settings saved:', settings);
      toast.success('Settings updated successfully!');
      // Reset password fields after successful save
      setSettings(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg my-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          Account Settings
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Manage your profile, preferences, and security settings.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <User className="text-indigo-600 dark:text-indigo-400 text-4xl" /> Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="username" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={settings.username}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-200 ${
                  errors.username ? 'border-red-500 ring-red-200' : 'border-gray-300'
                }`}
              />
              {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-200 ${
                  errors.email ? 'border-red-500 ring-red-200' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <Lock className="text-purple-600 dark:text-purple-400 text-4xl" /> Password & Security
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={settings.password}
                onChange={handlePasswordChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-200 ${
                  errors.password ? 'border-red-500 ring-red-200' : 'border-gray-300'
                }`}
                placeholder="Leave blank to keep current password"
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={settings.confirmPassword}
                onChange={handlePasswordChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-200 ${
                  errors.confirmPassword ? 'border-red-500 ring-red-200' : 'border-gray-300'
                }`}
                placeholder="Confirm your new password"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="pt-6 text-center">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 gap-3
              ${isSubmitting ? 'opacity-70 cursor-not-allowed from-gray-500 to-gray-600' : 'hover:from-indigo-700 hover:to-purple-800'}`
            }
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="text-xl" />
                Save Changes
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Settings;
