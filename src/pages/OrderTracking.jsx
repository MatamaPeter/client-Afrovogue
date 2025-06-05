import React, { useState } from 'react';
import { Package, Truck, Calendar, MapPin, Phone, Mail, XCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react';

const mockOrders = [
  {
    id: 'AFROVOGUE-2025001',
    userId: 1,
    date: '2025-05-28',
    status: 'Delivered',
    total: 185.99,
    deliveryAddress: '123 Nairobi Street, Westlands, Nairobi',
    trackingNumber: 'AV2025001TRK',
    estimatedDelivery: '2025-05-30',
    paymentMethod: 'Credit Card',
    items: [
      { id: 101, name: 'Ankara Print Maxi Dress', quantity: 1, price: 99.99, image: 'https://placehold.co/100x100/A020F0/ffffff?text=Dress', rating: 5 },
      { id: 102, name: 'Kente Pattern Scarf', quantity: 2, price: 25.00, image: 'https://placehold.co/100x100/F020A0/ffffff?text=Scarf', rating: 4 },
      { id: 103, name: 'Leather Sandals', quantity: 1, price: 36.00, image: 'https://placehold.co/100x100/20A0F0/ffffff?text=Sandals', rating: 5 },
    ],
  },
  {
    id: 'AFROVOGUE-2025002',
    userId: 1,
    date: '2025-05-20',
    status: 'Processing',
    total: 75.50,
    deliveryAddress: '456 Karen Road, Karen, Nairobi',
    trackingNumber: 'AV2025002TRK',
    estimatedDelivery: '2025-06-08',
    paymentMethod: 'M-Pesa',
    items: [
      { id: 104, name: 'Adire Print T-Shirt', quantity: 1, price: 45.50, image: 'https://placehold.co/100x100/00A0F0/ffffff?text=T-Shirt', rating: 0 },
      { id: 105, name: 'Beaded Bracelet Set', quantity: 1, price: 30.00, image: 'https://placehold.co/100x100/F0F020/ffffff?text=Bracelet', rating: 0 },
    ],
  },
  {
    id: 'AFROVOGUE-2025003',
    userId: 1,
    date: '2025-05-15',
    status: 'Cancelled',
    total: 120.00,
    deliveryAddress: '789 Kilimani Avenue, Kilimani, Nairobi',
    trackingNumber: 'AV2025003TRK',
    estimatedDelivery: null,
    paymentMethod: 'Bank Transfer',
    items: [
      { id: 106, name: 'Bogolan Mudcloth Jacket', quantity: 1, price: 120.00, image: 'https://placehold.co/100x100/A0F020/ffffff?text=Jacket', rating: 0 },
    ],
  },
  {
    id: 'AFROVOGUE-2025004',
    userId: 1,
    date: '2025-04-01',
    status: 'Delivered',
    total: 55.00,
    deliveryAddress: '321 Riverside Drive, Westlands, Nairobi',
    trackingNumber: 'AV2025004TRK',
    estimatedDelivery: '2025-04-05',
    paymentMethod: 'Credit Card',
    items: [
      { id: 107, name: 'African Print Headband', quantity: 3, price: 10.00, image: 'https://placehold.co/100x100/F020F0/ffffff?text=Headband', rating: 4 },
      { id: 108, name: 'Wooden Earrings', quantity: 1, price: 25.00, image: 'https://placehold.co/100x100/20F0A0/ffffff?text=Earrings', rating: 5 },
    ],
  },
  {
    id: 'AFROVOGUE-2025005',
    userId: 1,
    date: '2025-03-15',
    status: 'Shipped',
    total: 199.99,
    deliveryAddress: '555 Ngong Road, South C, Nairobi',
    trackingNumber: 'AV2025005TRK',
    estimatedDelivery: '2025-06-10',
    paymentMethod: 'M-Pesa',
    items: [
      { id: 109, name: 'Traditional Dashiki Shirt', quantity: 1, price: 89.99, image: 'https://placehold.co/100x100/FF6B35/ffffff?text=Dashiki', rating: 0 },
      { id: 110, name: 'Handwoven Basket', quantity: 2, price: 55.00, image: 'https://placehold.co/100x100/4ECDC4/ffffff?text=Basket', rating: 0 },
    ],
  },
];

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
  const [trackingNumber, setTrackingNumber] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const searchOrder = () => {
    setError(null);
    const foundOrder = mockOrders.find(
      (o) => o.trackingNumber.toLowerCase() === trackingNumber.toLowerCase() || o.id.toLowerCase() === trackingNumber.toLowerCase()
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
