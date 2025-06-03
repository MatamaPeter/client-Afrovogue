import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiUser, FiMessageSquare, FiCheckCircle, FiInfo } from 'react-icons/fi';
import toast from 'react-hot-toast'; // Assuming react-hot-toast is installed

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Your name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Your email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'A subject is required.';
    if (!formData.message.trim()) newErrors.message = 'A message is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please correct the highlighted errors in the form.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Contact form submitted:', formData);
      
      setIsSuccess(true);
      toast.success('Your message has been sent! We\'ll get back to you shortly.');
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setIsSuccess(false), 7000);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('There was an error sending your message. Please try again.');
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
          Get In Touch
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We'd love to hear from you! Whether you have a question about our products, an inquiry about custom orders, or just want to say hello, feel free to reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 h-full flex flex-col justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Details</h2>
            <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
              <div className="flex items-start">
                <FiMapPin className="text-indigo-600 dark:text-indigo-400 text-3xl mr-4 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Visit Our Studio (By Appointment)</p>
                  <p>123 AfroVogue Street, Kilimani</p>
                  <p>Nairobi, Kenya</p>
                </div>
              </div>
              <div className="flex items-center">
                <FiMail className="text-indigo-600 dark:text-indigo-400 text-3xl mr-4 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Email Us</p>
                  <a href="mailto:support@afrovogue.com" className="hover:underline text-indigo-600 dark:text-indigo-400">
                    support@afrovogue.com
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <FiPhone className="text-indigo-600 dark:text-indigo-400 text-3xl mr-4 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Call Us</p>
                  <a href="tel:+254712345678" className="hover:underline text-indigo-600 dark:text-indigo-400">
                    +254 712 345 678
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <FiClock className="text-indigo-600 dark:text-indigo-400 text-3xl mr-4 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Business Hours</p>
                  <p>Mon - Fri: 9:00 AM - 5:00 PM EAT</p>
                  <p>Sat: 10:00 AM - 2:00 PM EAT</p>
                </div>
              </div>
            </div>
          </div>
          {/* Map Placeholder */}
          <div className="mt-8 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
            <img
              src="https://placehold.co/600x300/F020A0/ffffff?text=Map+Placeholder"
              alt="Map location"
              className="w-full h-auto object-cover"
            />
            <div className="p-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm text-center">
              This is a placeholder for a map.
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
          
          <AnimatePresence>
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-green-100 dark:bg-green-800/40 p-4 text-green-800 dark:text-green-300 flex items-center gap-4 rounded-lg mb-6 font-medium"
                role="alert"
              >
                <FiCheckCircle className="text-2xl text-green-600 dark:text-green-400" />
                <div>
                  <p>Your message has been successfully sent!</p>
                  <p className="text-sm">We appreciate you reaching out and will get back to you as soon as possible.</p>
                </div>
                <button 
                  onClick={() => setIsSuccess(false)} 
                  className="ml-auto text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100"
                  aria-label="Close success message"
                >
                  <FiX className="text-xl" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-200 ${
                    errors.name ? 'border-red-500 ring-red-200' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : null}
                />
              </div>
              <AnimatePresence>
                {errors.name && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-sm text-red-500 flex items-center gap-1" id="name-error"
                  ><FiInfo className="mt-0.5" /> {errors.name}</motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Your Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-200 ${
                    errors.email ? 'border-red-500 ring-red-200' : 'border-gray-300'
                  }`}
                  placeholder="john.doe@example.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : null}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-sm text-red-500 flex items-center gap-1" id="email-error"
                  ><FiInfo className="mt-0.5" /> {errors.email}</motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiMessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-200 ${
                    errors.subject ? 'border-red-500 ring-red-200' : 'border-gray-300'
                  }`}
                  placeholder="Inquiry about custom order / Product question"
                  aria-invalid={errors.subject ? "true" : "false"}
                  aria-describedby={errors.subject ? "subject-error" : null}
                />
              </div>
              <AnimatePresence>
                {errors.subject && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-sm text-red-500 flex items-center gap-1" id="subject-error"
                  ><FiInfo className="mt-0.5" /> {errors.subject}</motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-200 ${
                  errors.message ? 'border-red-500 ring-red-200' : 'border-gray-300'
                }`}
                placeholder="Type your message here..."
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : null}
              />
              <AnimatePresence>
                {errors.message && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-sm text-red-500 flex items-center gap-1" id="message-error"
                  ><FiInfo className="mt-0.5" /> {errors.message}</motion.p>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3
                ${isSubmitting ? 'opacity-70 cursor-not-allowed from-gray-500 to-gray-600' : 'hover:from-indigo-700 hover:to-purple-800'}`
              }
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Message...
                </>
              ) : (
                <>
                  <FiSend className="text-xl" />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
