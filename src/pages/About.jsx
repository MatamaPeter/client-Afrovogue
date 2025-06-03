import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiGlobe, FiHeart, FiAward, FiUsers } from 'react-icons/fi';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg my-8"
    >
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          Our Story: Weaving Heritage into Modernity
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          At AfroVogue, we celebrate the vibrant tapestry of African culture, transforming traditional artistry into contemporary fashion statements.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <FiGlobe className="text-5xl text-indigo-600 dark:text-indigo-400 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            To empower African artisans and share the richness of African design with the world, fostering cultural appreciation and sustainable livelihoods through ethical fashion.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <FiHeart className="text-5xl text-purple-600 dark:text-purple-400 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            To be the leading global destination for authentic, high-quality African-inspired fashion, recognized for our commitment to craftsmanship, community, and cultural integrity.
          </p>
        </motion.div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <FiAward className="text-4xl text-amber-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Authenticity</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We honor traditional African techniques and designs, ensuring every piece tells a genuine story.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <FiUsers className="text-4xl text-green-600 dark:text-green-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Community</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We invest in the communities of our artisans, promoting fair trade and empowering local economies.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <FiHeart className="text-4xl text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Passion</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Our love for African culture drives us to create unique, high-quality garments with dedication and care.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Call to Action / Image Section */}
      <div className="relative rounded-xl overflow-hidden shadow-xl mb-16">
        <img
          src="https://placehold.co/1200x500/A020F0/ffffff?text=AfroVogue+Craftsmanship"
          alt="AfroVogue Craftsmanship"
          className="w-full h-96 object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Experience the AfroVogue Difference</h2>
          <p className="text-lg text-white opacity-90 max-w-2xl mb-6">
            Discover our exquisite collections, each piece a blend of rich heritage and contemporary style, handcrafted with passion.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
          >
            Shop Our Collections
          </a>
        </div>
      </div>

      {/* Testimonials (Placeholder) */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-10">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 italic text-gray-700 dark:text-gray-300"
          >
            "AfroVogue's designs are simply breathtaking. The quality is unmatched, and I always receive compliments. Truly a piece of art!"
            <p className="mt-4 font-semibold text-gray-900 dark:text-white">- Aisha M., Nairobi</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 italic text-gray-700 dark:text-gray-300"
          >
            "I love that AfroVogue supports local artisans. My custom dress was perfect, and the process was so seamless. Highly recommend!"
            <p className="mt-4 font-semibold text-gray-900 dark:text-white">- David K., London</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
