import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, Calendar, MapPin, Phone, Mail, XCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import mockOrders from './../assets/orders.js';


const getStatusClasses = (status) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'Processing':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'Shipped':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    case 'Cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'Delivered':
      return <CheckCircle className="w-5 h-5 mr-1" />;
    case 'Processing':
      return <Clock className="w-5 h-5 mr-1" />;
    case 'Shipped':
      return <Truck className="w-5 h-5 mr-1" />;
    case 'Cancelled':
      return <XCircle className="w-5 h-5 mr-1" />;
    default:
      return <Package className="w-5 h-5 mr-1" />;
  }
};

const OrderTracking = () => {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Check if user is logged in and handle URL params
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      navigate('/auth/login');
      return;
    }
    setUser(JSON.parse(loggedInUser));

    // Check for tracking number in URL
    const urlParams = new URLSearchParams(window.location.search);
    const trackingParam = urlParams.get('tracking');
    if (trackingParam) {
      setTrackingNumber(trackingParam);
      // Find order that matches tracking number
      const userObj = JSON.parse(loggedInUser);
      const foundOrder = mockOrders.find(
        (o) => 
          o.userId === userObj.id && 
          (o.trackingNumber.toLowerCase() === trackingParam.toLowerCase() || 
           o.id.toLowerCase() === trackingParam.toLowerCase())
      );
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError('Order not found. Please check the tracking number or order ID.');
      }
    }
  }, [navigate]);

  const searchOrder = () => {
    setError(null);
    // Find order that matches tracking number or order ID and belongs to the logged-in user
    const foundOrder = mockOrders.find(
      (o) => 
        o.userId === user?.id && 
        (o.trackingNumber.toLowerCase() === trackingNumber.toLowerCase() || 
         o.id.toLowerCase() === trackingNumber.toLowerCase())
    );

    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      setOrder(null);
      setError('Order not found. Please check the tracking number or order ID.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg my-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">Track Your Order</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter tracking number or order ID"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          onClick={searchOrder}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
        >
          Track
        </button>
      </div>

      {error && (
        <div className="text-red-600 dark:text-red-400 mb-6 text-center font-semibold">{error}</div>
      )}

      {order && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="flex items-center mb-4">
            {getStatusIcon(order.status)}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white ml-2">{order.id}</h2>
          </div>
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${getStatusClasses(order.status)}`}>
            {order.status}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Tracking Information</h3>
            <p><strong>Tracking Number:</strong> <span className="font-mono">{order.trackingNumber}</span></p>
            {order.estimatedDelivery && (
              <p><strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            )}
            <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map(item => (
                <div key={item.id} className="flex items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md mr-4 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-lg">{item.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Quantity: {item.quantity}</p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-bold text-md">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900 dark:text-white text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
