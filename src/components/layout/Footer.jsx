import React from 'react';
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiMail, 
  FiMapPin, 
  FiPhone, 
  FiClock,
  FiCreditCard,
  FiTruck,
  FiShield,
  FiGlobe, // Added for global/African touch
  FiHeart // Could be used for 'Proudly African'
} from 'react-icons/fi';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'; // For subtle animations
// Assuming you have SVG logos for payment methods, or can use an icon library like react-icons/fa6
import { 
  FaCcVisa, 
  FaCcMastercard, 
  FaPaypal, 
  FaCcAmex, 
  FaGooglePay, 
  FaApplePay 
} from 'react-icons/fa6'; 
// M-Pesa is specific, often a custom SVG/PNG. For now, use a generic mobile icon if no logo asset.
import { LuSmartphone } from "react-icons/lu"; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Shop All", href: "/shop" }, // Renamed for clarity
    { name: "Custom Orders", href: "/custom-order" }, // Renamed for clarity
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" } // Renamed for clarity
  ];

  const customerService = [
    { name: "FAQs", href: "/faqs" },
    { name: "Shipping & Delivery", href: "/shipping" }, // Renamed for clarity
    { name: "Returns & Exchanges", href: "/returns" }, // Renamed for clarity
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" }
  ];

  // Enhanced payment methods with actual React Icons for common ones
  const paymentMethods = [
    { name: "Visa", icon: <FaCcVisa className="text-blue-700 text-3xl" /> },
    { name: "Mastercard", icon: <FaCcMastercard className="text-orange-500 text-3xl" /> },
    { name: "PayPal", icon: <FaPaypal className="text-blue-800 text-3xl" /> },
    { name: "M-Pesa", icon: <LuSmartphone className="text-green-600 text-3xl" /> }, // Using a generic mobile icon for M-Pesa
    { name: "American Express", icon: <FaCcAmex className="text-indigo-700 text-3xl" /> },
    { name: "Google Pay", icon: <FaGooglePay className="text-red-600 text-3xl" /> },
    { name: "Apple Pay", icon: <FaApplePay className="text-gray-700 dark:text-white text-3xl" /> },
  ];

  return (
    <div className="bg-gradient-to-t from-gray-50 to-stone-100 dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      {/* Trust Badges Section */}
      <div className="bg-white dark:bg-gray-800 py-8 border-b border-gray-200 dark:border-gray-700 shadow-inner">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 text-center md:text-left">
            {/* Trust Badge 1 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 group transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.02 }}
            >
              <FiTruck className="text-indigo-600 dark:text-indigo-400 text-3xl group-hover:animate-pulse" />
              <div>
                <p className="font-bold text-lg text-gray-900 dark:text-white">Worldwide Shipping</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Free on orders over KES 10,000</p>
              </div>
            </motion.div>
            {/* Trust Badge 2 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 group transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.02 }}
            >
              <FiClock className="text-indigo-600 dark:text-indigo-400 text-3xl group-hover:rotate-6" />
              <div>
                <p className="font-bold text-lg text-gray-900 dark:text-white">24/7 Customer Support</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Always here to help</p>
              </div>
            </motion.div>
            {/* Trust Badge 3 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 group transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.02 }}
            >
              <FiCreditCard className="text-indigo-600 dark:text-indigo-400 text-3xl group-hover:scale-110" />
              <div>
                <p className="font-bold text-lg text-gray-900 dark:text-white">Secure Payments</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Industry-leading encryption</p>
              </div>
            </motion.div>
            {/* Trust Badge 4 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 group transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.02 }}
            >
              <FiShield className="text-indigo-600 dark:text-indigo-400 text-3xl group-hover:text-green-500" />
              <div>
                <p className="font-bold text-lg text-gray-900 dark:text-white">Quality Assurance</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Hand-picked authentic products</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <footer className="text-gray-700 dark:text-gray-300 py-16 sm:py-20">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-10">
            {/* About Column - Brand Focus */}
            <div className="lg:pr-8">
              <motion.h3 
                className="text-3xl font-extrabold mb-5 text-gray-900 dark:text-white tracking-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                AfroVogue
              </motion.h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                Celebrating African heritage through contemporary fashion. We curate exclusive collections that blend tradition with modern elegance, delivering timeless style globally.
              </p>
              <div className="flex space-x-5 text-2xl">
                <motion.a 
                  href="https://facebook.com/afrovogue" aria-label="Facebook" target="_blank" rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiFacebook />
                </motion.a>
                <motion.a 
                  href="https://twitter.com/afrovogue" aria-label="Twitter" target="_blank" rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiTwitter />
                </motion.a>
                <motion.a 
                  href="https://instagram.com/afrovogue" aria-label="Instagram" target="_blank" rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiInstagram />
                </motion.a>
                <motion.a 
                  href="mailto:support@afrovogue.com" aria-label="Email" 
                  className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiMail />
                </motion.a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Explore</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <motion.a 
                      href={link.href} 
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 inline-block py-1 text-base relative group"
                      whileHover={{ x: 5 }} // Slight slide on hover
                    >
                      {link.name}
                      <span className="absolute left-0 bottom-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 w-0 transition-all duration-300 group-hover:w-full"></span> {/* Underline effect */}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service Column */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Help & Support</h3>
              <ul className="space-y-3">
                {customerService.map((service, index) => (
                  <li key={index}>
                    <motion.a 
                      href={service.href} 
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 inline-block py-1 text-base relative group"
                      whileHover={{ x: 5 }}
                    >
                      {service.name}
                      <span className="absolute left-0 bottom-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 w-0 transition-all duration-300 group-hover:w-full"></span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Reach Us</h3>
              <address className="not-italic text-gray-600 dark:text-gray-400 space-y-3 mb-6">
                <div className="flex items-start">
                  <FiMapPin className="mt-1 mr-4 text-indigo-600 dark:text-indigo-400 text-lg" />
                  <div>
                    <p className="font-medium">AfroVogue Headquarters</p>
                    <p>Ngong Road, Nairobi</p>
                    <p>Kenya</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiMail className="mr-4 text-indigo-600 dark:text-indigo-400 text-lg" />
                  <motion.a 
                    href="mailto:hello@afrovogue.com" 
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                    whileHover={{ x: 2 }}
                  >
                    hello@afrovogue.com
                  </motion.a>
                </div>
                <div className="flex items-center">
                  <FiPhone className="mr-4 text-indigo-600 dark:text-indigo-400 text-lg" />
                  <motion.a 
                    href="tel:+254712345678" // Updated to a Kenyan number format example
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                    whileHover={{ x: 2 }}
                  >
                    +254 712 345 678
                  </motion.a>
                </div>
              </address>

              {/* Payment Methods */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Accepted Payments</h4>
                <div className="flex flex-wrap gap-3 items-center">
                  {paymentMethods.map((method, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center justify-center p-2 rounded-md bg-white dark:bg-gray-700 shadow-sm transition-all duration-200 hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {method.icon}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright & Branding Strip */}
      <div className="border-t border-gray-200 dark:border-gray-700 py-6 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-3 sm:mb-0 text-center sm:text-left">
              &copy; {currentYear} <span className="font-semibold text-gray-800 dark:text-gray-200">AfroVogue</span>. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-center sm:text-right">
              <span className="flex items-center gap-1 text-gray-700 dark:text-gray-300 font-medium">
                <FiGlobe className="text-indigo-600" /> Designed in Africa
              </span>
              <span className="flex items-center gap-1 text-gray-700 dark:text-gray-300 font-medium">
                <FiHeart className="text-red-500 fill-current" /> Proudly African
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;