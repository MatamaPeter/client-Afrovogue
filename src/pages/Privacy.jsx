import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiShield, FiUser, FiMail, FiLock } from 'react-icons/fi';

import { Cookie } from 'lucide-react';

const Privacy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg my-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          Privacy Policy
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Your privacy is paramount to us. This policy outlines how AfroVogue collects, uses, and protects your personal information.
        </p>
      </div>

      <div className="space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed prose prose-indigo dark:prose-invert max-w-none">
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <FiShield className="text-indigo-600 dark:text-indigo-400 text-4xl" /> Introduction
          </h2>
          <p>
            Welcome to AfroVogue! This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from <a href="https://www.afrovogue.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">www.afrovogue.com</a> (the "Site").
          </p>
          <p>
            By using our Site, you agree to the collection and use of information in accordance with this policy. We are committed to protecting your privacy and ensuring a secure online experience.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <FiUser className="text-purple-600 dark:text-purple-400 text-4xl" /> Information We Collect
          </h2>
          <p>We collect various types of information to provide and improve our service to you:</p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Personal Information You Provide:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-medium">Contact Data:</span> Name, email address, phone number, shipping address.</li>
            <li><span className="font-medium">Payment Data:</span> Payment card details (processed securely by third-party payment processors, we do not store full card numbers).</li>
            <li><span className="font-medium">Account Data:</span> Username, password, purchase history.</li>
            <li><span className="font-medium">Communication Data:</span> Content of your messages to us.</li>
          </ul>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Automatically Collected Information:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-medium">Usage Data:</span> IP address, browser type, operating system, pages visited, time spent on pages, referral source.</li>
            <li><span className="font-medium">Device Data:</span> Device type, unique device identifiers.</li>
            <li><span className="font-medium">Location Data:</span> General geographic location based on IP address.</li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <FiMail className="text-green-600 dark:text-green-400 text-4xl" /> How We Use Your Information
          </h2>
          <p>We use the collected data for various purposes:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>To provide and maintain our Service.</li>
            <li>To process your orders and manage your account.</li>
            <li>To notify you about changes to our Service.</li>
            <li>To provide customer support.</li>
            <li>To monitor the usage of our Service.</li>
            <li>To detect, prevent and address technical issues.</li>
            <li>To send you marketing and promotional communications (with your consent).</li>
            <li>To improve our products and services.</li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <FiLock className="text-red-600 dark:text-red-400 text-4xl" /> Data Security
          </h2>
          <p>
            The security of your data is important to us. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security. No method of transmission over the Internet, or method of electronic storage is 100% secure.
          </p>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <Cookie className="text-amber-600 dark:text-amber-400 text-4xl" /> Cookies Policy
          </h2>
          <p>
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Types of Cookies We Use:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-medium">Necessary Cookies:</span> Essential for the website to function.</li>
            <li><span className="font-medium">Preference Cookies:</span> To remember your preferences and various settings.</li>
            <li><span className="font-medium">Security Cookies:</span> For security purposes.</li>
            <li><span className="font-medium">Advertising Cookies:</span> To serve you relevant ads.</li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <FiUser className="text-blue-600 dark:text-blue-400 text-4xl" /> Your Data Protection Rights
          </h2>
          <p>Depending on your location, you may have the following data protection rights:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>The right to access, update or to delete the information we have on you.</li>
            <li>The right to rectification.</li>
            <li>The right to object.</li>
            <li>The right of restriction.</li>
            <li>The right to data portability.</li>
            <li>The right to withdraw consent.</li>
          </ul>
          <p className="mt-4">
            If you wish to exercise any of these rights, please contact us at <a href="mailto:privacy@afrovogue.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">privacy@afrovogue.com</a>.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Last updated: June 2, 2025
          </p>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Privacy;
