import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiRefreshCw, FiCalendar, FiTag, FiDollarSign, FiMail, FiInfo,FiTruck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Returns = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg my-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          Returns & Exchanges Policy
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Your satisfaction is our priority. Here's everything you need to know about returning or exchanging your AfroVogue purchase.
        </p>
      </div>

      <div className="space-y-12">
        {/* Section 1: General Policy */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <FiRefreshCw className="text-indigo-600 dark:text-indigo-400 text-4xl" /> Our Return Policy
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            We want you to love your AfroVogue purchase. If you are not entirely satisfied, we're here to help. You have 30 calendar days to return an item from the date you received it.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-blue-800 dark:text-blue-300 flex items-start gap-3">
            <FiInfo className="text-2xl mt-1 flex-shrink-0" />
            <p className-="font-medium">
              <span className="font-bold">Important:</span> Custom-made or personalized items are final sale and cannot be returned or exchanged unless there is a defect in craftsmanship or material.
            </p>
          </div>
        </motion.div>

        {/* Section 2: Eligibility */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <FiTag className="text-purple-600 dark:text-purple-400 text-4xl" /> Eligibility for Returns
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            To be eligible for a return, your item must meet the following conditions:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Item must be unused, unworn, and in the same condition that you received it.</li>
            <li>Item must be in its original packaging.</li>
            <li>Item must have all original tags and labels attached.</li>
            <li>You must have the receipt or proof of purchase.</li>
          </ul>
        </motion.div>

        {/* Section 3: Refunds */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <FiDollarSign className="text-green-600 dark:text-green-400 text-4xl" /> Refunds
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within a certain amount of days, depending on your card issuer's policies.
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-gray-700 dark:text-gray-300 flex items-start gap-3">
            <FiCalendar className="text-2xl mt-1 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <p className="font-medium">
              Refunds are typically processed within 5-7 business days after approval.
            </p>
          </div>
        </motion.div>

        {/* Section 4: Shipping Returns */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <FiTruck className="text-blue-600 dark:text-blue-400 text-4xl" /> Shipping Returns
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            We recommend using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-md transform hover:scale-105"
          >
            <FiMail className="mr-2" /> Contact Customer Service
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Returns;
