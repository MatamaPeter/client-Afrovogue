import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiTruck, FiGlobe, FiClock, FiDollarSign, FiPackage, FiMapPin, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Shipping = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg my-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Your AfroVogue order, delivered with care and efficiency, wherever you are.
        </p>
      </div>

      <div className="space-y-12">
        {/* Section 1: General Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <FiTruck className="text-indigo-600 dark:text-indigo-400 text-4xl" /> Shipping Overview
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            At AfroVogue, we are committed to delivering your unique African-inspired fashion promptly and securely. We partner with reliable shipping carriers to ensure your order reaches you in excellent condition, no matter where you are in the world.
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>We ship worldwide to most countries.</li>
            <li>All orders are processed and shipped from our Nairobi hub.</li>
            <li>You will receive a tracking number once your order is dispatched.</li>
          </ul>
        </motion.div>

        {/* Section 2: Shipping Methods & Times */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <FiClock className="text-purple-600 dark:text-purple-400 text-4xl" /> Delivery Times & Costs
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            We offer various shipping options to meet your needs. Please note that processing times (1-3 business days) are in addition to shipping times.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <FiPackage className="text-green-600 dark:text-green-400" /> Standard Shipping
              </h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li><span className="font-medium">Delivery Time:</span> 7-14 business days</li>
                <li><span className="font-medium">Cost:</span> KES 800 (approx. $5.99)</li>
                <li><span className="font-medium">Free Shipping:</span> On orders over KES 10,000 (approx. $75)</li>
              </ul>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <FiGlobe className="text-red-600 dark:text-red-400" /> Express International Shipping
              </h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li><span className="font-medium">Delivery Time:</span> 3-7 business days</li>
                <li><span className="font-medium">Cost:</span> KES 1,800 (approx. $12.99)</li>
                <li><span className="font-medium">Availability:</span> Select countries only</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Section 3: Customs & Duties */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <FiDollarSign className="text-amber-600 dark:text-amber-400 text-4xl" /> Customs, Duties & Taxes
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            For international orders, please be aware that your package may be subject to customs duties, taxes, and fees levied by the destination country. These charges are the responsibility of the recipient.
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>AfroVogue is not responsible for any customs and taxes applied to your order.</li>
            <li>All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</li>
            <li>We recommend checking with your local customs office for estimated duties and taxes before placing an order.</li>
          </ul>
        </motion.div>

        {/* Section 4: Tracking Your Order */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <FiMapPin className="text-blue-600 dark:text-blue-400 text-4xl" /> Tracking Your Order
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Once your order has been shipped, you will receive an email notification from us which will include a tracking number you can use to check its status.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Please allow 24-48 hours for the tracking information to become available. If you haven't received your order within 20 business days of receiving your shipping confirmation email, please contact us at <a href="mailto:support@afrovogue.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">support@afrovogue.com</a> with your name and order number, and we will look into it for you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-md transform hover:scale-105"
          >
            <FiMail className="mr-2" /> Contact Support
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Shipping;
