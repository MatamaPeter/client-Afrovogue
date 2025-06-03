import React, { useContext, useState, useEffect } from "react";
import { CartWishlistContext } from "../../context/CartWishlistContext";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiChevronDown, FiCheckCircle, FiPackage, FiCreditCard, FiUser, FiMail, FiMapPin, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
// Assume a toast notification library like react-hot-toast is installed
// import toast from 'react-hot-toast'; 

const Checkout = () => {
  const { cartItems, updateCartQuantity, removeFromCart } = useContext(CartWishlistContext);
  const navigate = useNavigate(); // Hook for navigation

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit_card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeAccordion, setActiveAccordion] = useState("shipping"); // Default to shipping
  const [isProcessing, setIsProcessing] = useState(false); // For submit button loading state

  // Scroll to top on component mount or order placed
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [orderPlaced]);


  const handleQuantityChange = (productId, change, selectedSize) => {
    updateCartQuantity(productId, selectedSize, change);
    // Optional: Add a subtle animation or flash to the updated item
  };

  const handleRemove = (productId, selectedSize) => {
    removeFromCart(productId, selectedSize);
    // toast.success('Item removed from cart!'); // Example toast notification
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being typed into
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.address.trim()) newErrors.address = "Shipping Address is required.";

    if (formData.paymentMethod === "credit_card") {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card Number is required.";
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = "Card Number must be 16 digits.";
      
      if (!formData.expiryDate.trim()) newErrors.expiryDate = "Expiry Date is required.";
      else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiryDate)) newErrors.expiryDate = "Invalid Expiry Date (MM/YY).";
      
      if (!formData.cvv.trim()) newErrors.cvv = "CVV is required.";
      else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = "CVV must be 3 or 4 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const TAX_RATE = 0.1; // 10%
  const SHIPPING_COST = 5.99;

  const subtotal = calculateSubtotal();
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_COST;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // toast.error('Please correct the errors in the form.'); // Example toast notification
      setActiveAccordion(Object.keys(errors).includes('name') || Object.keys(errors).includes('email') || Object.keys(errors).includes('address') ? 'shipping' : 'payment');
      return;
    }

    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOrderPlaced(true);
    setIsProcessing(false);
    // toast.success('Order placed successfully!'); // Example toast notification
  };

  // Order confirmation page
  if (orderPlaced) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto p-8 lg:p-12 text-center my-12"
      >
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 sm:p-10 rounded-3xl shadow-2xl mb-8 transform hover:scale-102 transition-transform duration-300">
          <FiCheckCircle className="text-7xl mx-auto mb-5 animate-bounce-once" />
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-3">Order Confirmed!</h2>
          <p className="text-xl sm:text-2xl font-light">Thank you for your purchase, <span className="font-semibold">{formData.name}</span>.</p>
          <p className="mt-2 text-lg">Your order ID is: <span className="font-mono bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">#ABCDE12345</span></p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 max-w-lg mx-auto border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-5 text-gray-900 dark:text-gray-200">Order Summary</h3>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover mr-3" />
                  <span>{item.name} <span className="text-sm text-gray-500 dark:text-gray-400">× {item.quantity}</span></span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-100">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4"></div>
          <div className="space-y-3 text-gray-800 dark:text-gray-200">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${SHIPPING_COST.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({ (TAX_RATE * 100).toFixed(0) }%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
              <div className="flex justify-between font-bold text-xl mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <span>Total Paid</span>
                <span className="text-green-600 dark:text-green-400">${total.toFixed(2)}</span>
              </div>
          </div>

          <button
            onClick={() => navigate('/shop')}
            className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <FiShoppingCart /> Continue Shopping
          </button>
        </div>
      </motion.div>
    );
  }

  // Main checkout form
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl lg:text-5xl font-extrabold mb-10 text-center text-gray-900 dark:text-white">Secure Checkout</h1>
      
      {cartItems.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-8"
        >
          <FiShoppingCart className="text-6xl text-gray-400 dark:text-gray-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">Your cart is empty!</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet. Start exploring our amazing products!
          </p>
          <button 
            onClick={() => navigate('/shop')}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-xl transform hover:-translate-y-1"
          >
            Start Shopping Now
          </button>
        </motion.div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                <FiPackage className="mr-3 text-indigo-500" /> Your Order ({cartItems.length} items)
              </h2>
              <AnimatePresence>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cartItems.map((item) => (
                    <motion.li 
                      key={item.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                      layout // Enables smooth layout transitions for removed items
                      transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
                      className="py-5 flex items-center"
                    >
                      <div className="flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="ml-5 flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white leading-tight pr-4">{item.name}</h3>
                          <p className="font-bold text-xl text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        {item.selectedSize && <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Size: <span className="font-medium">{item.selectedSize}</span></p>}
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">${item.price.toFixed(2)} each</p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden shadow-sm">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1, item.selectedSize)}
                              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-lg font-bold"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              -
                            </button>
                            <span className="px-5 text-lg font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1, item.selectedSize)}
                              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-lg font-bold"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemove(item.id, item.selectedSize)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center font-medium px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <FiTrash2 className="mr-2 text-xl" /> Remove
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column - Checkout Form */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sm:p-8 sticky top-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-gray-700 dark:text-gray-300">
                <div className="flex justify-between items-center">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="font-medium">${SHIPPING_COST.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tax ({ (TAX_RATE * 100).toFixed(0) }%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4"></div>
                <div className="flex justify-between font-bold text-2xl text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Accordion Checkout Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Info Accordion */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                  <div 
                    className={`p-4 cursor-pointer flex justify-between items-center transition-colors duration-200 ${activeAccordion === 'shipping' ? 'bg-gray-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')}
                    role="button"
                    aria-expanded={activeAccordion === 'shipping'}
                    aria-controls="shipping-panel"
                  >
                    <h3 className="font-semibold text-lg flex items-center">
                      <FiUser className="mr-3" /> Shipping Information
                    </h3>
                    <FiChevronDown className={`transform transition-transform duration-300 ${activeAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {activeAccordion === 'shipping' && (
                      <motion.div
                        id="shipping-panel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="px-4 pb-4 space-y-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
                      >
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                          <div className="relative">
                            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg px-4 py-2 pl-10 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200`}
                              aria-invalid={errors.name ? "true" : "false"}
                              aria-describedby={errors.name ? "name-error" : null}
                            />
                          </div>
                          {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                          <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg px-4 py-2 pl-10 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200`}
                              aria-invalid={errors.email ? "true" : "false"}
                              aria-describedby={errors.email ? "email-error" : null}
                            />
                          </div>
                          {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.email}</p>}
                        </div>
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shipping Address</label>
                          <div className="relative">
                            <FiMapPin className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
                            <textarea
                              id="address"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              rows={3}
                              className={`w-full border ${errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg px-4 py-2 pl-10 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200`}
                              aria-invalid={errors.address ? "true" : "false"}
                              aria-describedby={errors.address ? "address-error" : null}
                            />
                          </div>
                          {errors.address && <p id="address-error" className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.address}</p>}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Payment Method Accordion */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                  <div 
                    className={`p-4 cursor-pointer flex justify-between items-center transition-colors duration-200 ${activeAccordion === 'payment' ? 'bg-gray-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    onClick={() => setActiveAccordion(activeAccordion === 'payment' ? '' : 'payment')}
                    role="button"
                    aria-expanded={activeAccordion === 'payment'}
                    aria-controls="payment-panel"
                  >
                    <h3 className="font-semibold text-lg flex items-center">
                      <FiCreditCard className="mr-3" /> Payment Method
                    </h3>
                    <FiChevronDown className={`transform transition-transform duration-300 ${activeAccordion === 'payment' ? 'rotate-180' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {activeAccordion === 'payment' && (
                      <motion.div
                        id="payment-panel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="px-4 pb-4 space-y-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
                      >
                        <div>
                          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Choose Method</label>
                          <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
                          >
                            <option value="credit_card">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="mpesa_kenya">M-Pesa (Kenya)</option> {/* Added M-Pesa for local relevance */}
                            <option value="apple_pay">Apple Pay</option>
                            <option value="google_pay">Google Pay</option>
                          </select>
                        </div>

                        {formData.paymentMethod === "credit_card" && (
                          <>
                            <div>
                              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Number</label>
                              <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                placeholder="•••• •••• •••• ••••"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                className={`w-full border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200`}
                                maxLength="19" // 16 digits + 3 spaces
                                onKeyPress={(e) => { // Auto-format card number
                                  if ((e.target.value.replace(/\s/g, '').length % 4 === 0) && e.key !== 'Backspace' && e.target.value.length < 19) {
                                    e.target.value += ' ';
                                  }
                                }}
                                aria-invalid={errors.cardNumber ? "true" : "false"}
                                aria-describedby={errors.cardNumber ? "cardNumber-error" : null}
                              />
                              {errors.cardNumber && <p id="cardNumber-error" className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.cardNumber}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry Date (MM/YY)</label>
                                <input
                                  type="text"
                                  id="expiryDate"
                                  name="expiryDate"
                                  placeholder="MM/YY"
                                  value={formData.expiryDate}
                                  onChange={handleInputChange}
                                  className={`w-full border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200`}
                                  maxLength="5"
                                  onKeyPress={(e) => { // Auto-add slash
                                    if (e.target.value.length === 2 && e.key !== 'Backspace') {
                                      e.target.value += '/';
                                    }
                                  }}
                                  aria-invalid={errors.expiryDate ? "true" : "false"}
                                  aria-describedby={errors.expiryDate ? "expiryDate-error" : null}
                                />
                                {errors.expiryDate && <p id="expiryDate-error" className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.expiryDate}</p>}
                              </div>
                              <div>
                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVV</label>
                                <input
                                  type="text"
                                  id="cvv"
                                  name="cvv"
                                  placeholder="123"
                                  value={formData.cvv}
                                  onChange={handleInputChange}
                                  className={`w-full border ${errors.cvv ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200`}
                                  maxLength="4"
                                  aria-invalid={errors.cvv ? "true" : "false"}
                                  aria-describedby={errors.cvv ? "cvv-error" : null}
                                />
                                {errors.cvv && <p id="cvv-error" className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.cvv}</p>}
                              </div>
                            </div>
                          </>
                        )}
                        {/* Example for M-Pesa (You'd expand this based on actual integration) */}
                        {formData.paymentMethod === "mpesa_kenya" && (
                           <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-md text-green-800 dark:text-green-300">
                             <p className="font-semibold text-base mb-2">Pay with M-Pesa</p>
                             <p className="text-sm">
                               Please send <span className="font-bold">${total.toFixed(2)}</span> to Till Number <span className="font-bold">XXXXXX</span>. 
                               You will receive an M-Pesa prompt on your phone shortly.
                             </p>
                             <p className="text-xs italic mt-2">Ensure your phone number linked to M-Pesa is correct in your profile.</p>
                           </div>
                        )}
                         {/* Other payment methods can have their own instructions/fields */}
                         {formData.paymentMethod === "paypal" && (
                           <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md text-blue-800 dark:text-blue-300">
                             <p className="font-semibold text-base mb-2">Pay with PayPal</p>
                             <p className="text-sm">
                               After clicking "Complete Purchase", you will be redirected to PayPal to complete your payment securely.
                             </p>
                           </div>
                         )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-3 sm:py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 shadow-xl flex items-center justify-center relative overflow-hidden"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <motion.span 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.3 }}
                        className="flex items-center"
                      >
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </motion.span>
                    </>
                  ) : (
                    <>
                      Complete Purchase
                      <motion.div 
                        className="absolute inset-0 bg-white opacity-10 blur-sm rounded-full" 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        transition={{ delay: 0.5, duration: 0.5, type: "tween" }}
                      />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
