import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiHelpCircle, FiChevronDown, FiShoppingBag, FiTruck, FiRefreshCw, FiCreditCard, FiShield } from 'react-icons/fi';

const Faqs = () => {
  const faqData = [
    {
      category: "General Questions",
      icon: <FiHelpCircle />,
      questions: [
        {
          q: "What is AfroVogue?",
          a: "AfroVogue is an online fashion store dedicated to bringing authentic, high-quality African-inspired clothing and accessories to a global audience. We blend traditional African designs with contemporary styles."
        },
        {
          q: "Where are your products sourced from?",
          a: "Our products are ethically sourced from skilled artisans and designers across various African countries. We prioritize fair trade practices and sustainable partnerships to support local communities."
        },
        {
          q: "Do you have a physical store?",
          a: "Currently, AfroVogue operates exclusively online to reach a wider global customer base. However, we occasionally participate in pop-up events and fashion shows. Follow our social media for updates!"
        }
      ]
    },
    {
      category: "Orders & Products",
      icon: <FiShoppingBag />,
      questions: [
        {
          q: "How do I place an order?",
          a: "Simply browse our collections, select your desired items, choose your size and quantity, and add them to your cart. Proceed to checkout to complete your purchase by providing shipping and payment details."
        },
        {
          q: "How do I know my size?",
          a: "We provide a comprehensive size guide on each product page to help you find the perfect fit. We recommend taking your measurements and comparing them to our guide for accuracy. For custom orders, detailed measurements are required."
        },
        {
          q: "Can I place a custom order?",
          a: "Yes! We offer custom order services for unique designs. Visit our 'Custom Orders' page to submit your design vision, measurements, and any reference images. Our team will get back to you to discuss the details."
        },
        {
          q: "What if an item is out of stock?",
          a: "If an item is out of stock, you can often sign up for email notifications on the product page to be alerted when it becomes available again. For popular items, we strive to restock as quickly as possible."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      icon: <FiTruck />,
      questions: [
        {
          q: "What are your shipping options and costs?",
          a: "We offer standard and express shipping options. Standard shipping is free on orders over KES 10,000 (or equivalent in your currency). Shipping costs vary based on your location and chosen method. Please refer to our 'Shipping Policy' page for detailed information."
        },
        {
          q: "How long does delivery take?",
          a: "Delivery times vary depending on your location and the shipping method selected. Standard shipping typically takes 7-14 business days, while express shipping takes 3-7 business days. Custom orders have longer lead times."
        },
        {
          q: "How can I track my order?",
          a: "Once your order is shipped, you will receive a confirmation email with a tracking number and a link to track your package's journey."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      icon: <FiRefreshCw />,
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day return policy from the date of delivery. Items must be unused, unwashed, with all original tags attached, and in their original packaging. Custom orders are generally non-returnable. Please see our 'Return Policy' for full details."
        },
        {
          q: "How do I initiate a return or exchange?",
          a: "To initiate a return or exchange, please contact our customer service team via email or phone with your order number and reason for return. They will guide you through the process."
        },
        {
          q: "When will I receive my refund?",
          a: "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be issued to your original payment method."
        }
      ]
    },
    {
      category: "Payments & Security",
      icon: <FiCreditCard />,
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and M-Pesa (for Kenyan customers). All transactions are securely processed."
        },
        {
          q: "Is my payment information secure?",
          a: "Yes, absolutely. We use industry-leading encryption and security protocols to protect your payment information. Your data is never stored on our servers."
        },
        {
          q: "Do you offer gift cards?",
          a: "Yes, AfroVogue gift cards are available for purchase! They are a perfect way to share the joy of African fashion with your loved ones."
        }
      ]
    }
  ];

  const [openCategory, setOpenCategory] = useState(faqData[0].category); // Open first category by default
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleCategory = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
    setOpenQuestion(null); // Close any open questions when category changes
  };

  const toggleQuestion = (questionIndex) => {
    setOpenQuestion(openQuestion === questionIndex ? null : questionIndex);
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
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Find quick answers to common questions about AfroVogue, our products, orders, shipping, and more.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:w-1/4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 h-fit sticky top-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Categories</h2>
          <ul className="space-y-3">
            {faqData.map((category) => (
              <li key={category.category}>
                <button
                  onClick={() => toggleCategory(category.category)}
                  className={`w-full text-left py-3 px-4 rounded-lg flex items-center gap-3 font-medium transition-colors duration-200
                    ${openCategory === category.category
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  {category.icon}
                  <span>{category.category}</span>
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* FAQ Content */}
        <div className="lg:w-3/4 space-y-6">
          {faqData.map((category) => (
            <AnimatePresence key={category.category}>
              {openCategory === category.category && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                >
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    {category.icon} {category.category}
                  </h2>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {category.questions.map((item, index) => (
                      <div key={index} className="py-4">
                        <button
                          onClick={() => toggleQuestion(index)}
                          className="w-full text-left flex justify-between items-center text-lg font-semibold text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {item.q}
                          <FiChevronDown className={`text-xl transition-transform duration-300 ${openQuestion === index ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {openQuestion === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed overflow-hidden"
                            >
                              <p>{item.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Faqs;
