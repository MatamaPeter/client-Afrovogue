import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, // For general order icon
  Clock, // For processing status
  CheckCircle, // For delivered status
  XCircle, // For cancelled status
  ChevronDown, // For accordion toggle
  ShoppingCart, // For empty cart state
  Calendar, // For order date
  DollarSign // For order total
} from 'lucide-react'; // Using Lucide React icons

const mockOrders = [
  {
    id: 'AFROVOGUE-2025001',
    date: '2025-05-28',
    status: 'Delivered',
    total: 185.99,
    items: [
      { id: 101, name: 'Ankara Print Maxi Dress', quantity: 1, price: 99.99, image: 'https://placehold.co/100x100/A020F0/ffffff?text=Dress' },
      { id: 102, name: 'Kente Pattern Scarf', quantity: 2, price: 25.00, image: 'https://placehold.co/100x100/F020A0/ffffff?text=Scarf' },
      { id: 103, name: 'Leather Sandals', quantity: 1, price: 36.00, image: 'https://placehold.co/100x100/20A0F0/ffffff?text=Sandals' },
    ],
  },
  {
    id: 'AFROVOGUE-2025002',
    date: '2025-05-20',
    status: 'Processing',
    total: 75.50,
    items: [
      { id: 104, name: 'Adire Print T-Shirt', quantity: 1, price: 45.50, image: 'https://placehold.co/100x100/00A0F0/ffffff?text=T-Shirt' },
      { id: 105, name: 'Beaded Bracelet Set', quantity: 1, price: 30.00, image: 'https://placehold.co/100x100/F0F020/ffffff?text=Bracelet' },
    ],
  },
  {
    id: 'AFROVOGUE-2025003',
    date: '2025-05-15',
    status: 'Cancelled',
    total: 120.00,
    items: [
      { id: 106, name: 'Bogolan Mudcloth Jacket', quantity: 1, price: 120.00, image: 'https://placehold.co/100x100/A0F020/ffffff?text=Jacket' },
    ],
  },
  {
    id: 'AFROVOGUE-2025004',
    date: '2025-04-01',
    status: 'Delivered',
    total: 55.00,
    items: [
      { id: 107, name: 'African Print Headband', quantity: 3, price: 10.00, image: 'https://placehold.co/100x100/F020F0/ffffff?text=Headband' },
      { id: 108, name: 'Wooden Earrings', quantity: 1, price: 25.00, image: 'https://placehold.co/100x100/20F0A0/ffffff?text=Earrings' },
    ],
  },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // State to manage expanded order

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        setOrders(mockOrders);
        setError(null);
      } catch (err) {
        setError('Failed to load orders. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-4 h-4 mr-1" />;
      case 'Processing':
        return <Clock className="w-4 h-4 mr-1" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4 mr-1" />;
      default:
        return <Package className="w-4 h-4 mr-1" />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center min-h-[500px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg my-8">
        <div className="flex flex-col items-center">
          <svg className="animate-spin text-indigo-600 dark:text-indigo-400 h-12 w-12 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-xl font-medium text-gray-700 dark:text-gray-300">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-xl shadow-lg my-8">
        <p className="text-xl font-medium">{error}</p>
        <p className="mt-2 text-lg">Please try refreshing the page.</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg my-8"
      >
        <ShoppingCart className="text-6xl text-gray-400 dark:text-gray-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">No Orders Found</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          It looks like you haven't placed any orders with AfroVogue yet. Start exploring our beautiful collections!
        </p>
        <a
          href="/shop"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-xl transform hover:-translate-y-1"
        >
          Start Shopping Now
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg my-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          My Orders
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Review the details of your past purchases with AfroVogue.
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Order Summary Header */}
            <button
              onClick={() => toggleOrderDetails(order.id)}
              className="w-full p-6 flex flex-col md:flex-row justify-between items-center text-left cursor-pointer transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              aria-expanded={expandedOrderId === order.id}
              aria-controls={`order-details-${order.id}`}
            >
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  <Package className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  Order ID: <span className="font-mono ml-2">{order.id}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  Order Date: {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end mb-4 md:mb-0">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center ${getStatusClasses(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </span>
                <div className="flex items-center text-xl font-bold text-gray-900 dark:text-white mt-2">
                  <DollarSign className="w-5 h-5 mr-1 text-green-600 dark:text-green-400" />
                  Total: ${order.total.toFixed(2)}
                </div>
              </div>
              <ChevronDown className={`w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${expandedOrderId === order.id ? 'rotate-180' : ''}`} />
            </button>

            {/* Order Details Accordion Content */}
            <AnimatePresence>
              {expandedOrderId === order.id && (
                <motion.div
                  id={`order-details-${order.id}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-700"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Items in this Order:</h3>
                  <ul className="space-y-4">
                    {order.items.map(item => (
                      <li key={item.id} className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md mr-4 flex-shrink-0"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white text-lg">{item.name}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">Quantity: {item.quantity}</p>
                          <p className="text-indigo-600 dark:text-indigo-400 font-bold text-md mt-1">${item.price.toFixed(2)} each</p>
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white text-lg">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Orders;
