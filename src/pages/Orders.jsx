import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mockOrders from './../assets/orders.js';

import { 
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  ShoppingCart,
  Calendar,
  DollarSign,
  Filter,
  Search,
  Download,
  Eye,
  Truck,
  RefreshCw,
  Star,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  HelpCircle,
  CreditCard,
  Repeat,
  ArrowRight,
  ChevronLeft,
  ChevronUp,
  Info,
  Shield
} from 'lucide-react';



const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [selectedTab, setSelectedTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get user from localStorage
  useEffect(() => {
    try {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (!loggedInUser) {
        // Redirect to login if not logged in
        navigate('/auth/login');
        return;
      }
      const user = JSON.parse(loggedInUser);
      
      // Filter orders for the logged-in user
      const userOrders = mockOrders.filter(order => order.userId === user.id);
      setOrders(userOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error loading orders:', error);
      setError('Failed to load orders. Please try again.');
      setLoading(false);
    }
  }, [navigate]); // Including navigate in dependencies as per ESLint rule

  useEffect(() => {
    let filtered = [...orders];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Apply date filter
    if (dateFilter !== 'All') {
      const today = new Date();
      const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
      const ninetyDaysAgo = new Date(today.setDate(today.getDate() - 90));
      
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.date);
        switch (dateFilter) {
          case 'Last 30 Days':
            return orderDate >= thirtyDaysAgo;
          case 'Last 90 Days':
            return orderDate >= ninetyDaysAgo;
          default:
            return true;
        }
      });
    }

    // Apply tab filter
    switch (selectedTab) {
      case 'processing':
        filtered = filtered.filter(order => order.status === 'Processing');
        break;
      case 'shipped':
        filtered = filtered.filter(order => order.status === 'Shipped');
        break;
      case 'delivered':
        filtered = filtered.filter(order => order.status === 'Delivered');
        break;
      case 'cancelled':
        filtered = filtered.filter(order => order.status === 'Cancelled');
        break;
      default:
        break;
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter, dateFilter, selectedTab]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

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
        return <CheckCircle className="w-4 h-4 mr-1" />;
      case 'Processing':
        return <Clock className="w-4 h-4 mr-1" />;
      case 'Shipped':
        return <Truck className="w-4 h-4 mr-1" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4 mr-1" />;
      default:
        return <Package className="w-4 h-4 mr-1" />;
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const downloadInvoice = (orderId) => {
    // Simulate invoice download
    const blob = new Blob([`Invoice for Order ${orderId}\n\nThank you for shopping with AfroVogue!`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reorderItems = (order) => {
    alert(`Reordering items from ${order.id}. Redirecting to cart...`);
  };

  const trackOrder = (trackingNumber) => {
    navigate(`/order-tracking?tracking=${trackingNumber}`);
  };

  const requestReturn = (orderId) => {
    alert(`Initiating return process for order ${orderId}`);
  };

  const contactSupport = (orderId) => {
    alert(`Contacting support about order ${orderId}`);
  };

  const orderStats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    processing: orders.filter(o => o.status === 'Processing').length,
    shipped: orders.filter(o => o.status === 'Shipped').length,
    cancelled: orders.filter(o => o.status === 'Cancelled').length,
    totalSpent: orders.reduce((sum, order) => sum + order.total, 0)
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center min-h-[500px] flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg my-8">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 dark:border-indigo-800"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 dark:border-indigo-400 absolute top-0"></div>
          </div>
          <p className="text-xl font-medium text-gray-700 dark:text-gray-300 mt-4">Loading your orders...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Please wait while we fetch your order history</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center bg-red-50 dark:bg-red-900/20 rounded-xl shadow-lg my-8">
        <XCircle className="w-16 h-16 text-red-600 dark:text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-2">Oops! Something went wrong</h2>
        <p className="text-lg text-red-700 dark:text-red-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center mx-auto"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg my-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-inner">
          <ShoppingCart className="w-24 h-24 text-gray-400 dark:text-gray-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">No Orders Yet</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Start your AfroVogue journey! Discover our authentic African fashion and accessories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-xl transform hover:-translate-y-1"
            >
              Start Shopping Now
            </a>
            <a
              href="/collections"
              className="border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
            >
              Browse Collections
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg my-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          My Order History
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Track your AfroVogue purchases and manage your orders
        </p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{orderStats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Orders</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{orderStats.delivered}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Delivered</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{orderStats.processing}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Processing</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{orderStats.shipped}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Shipped</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">${orderStats.totalSpent.toFixed(0)}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Spent</div>
          </div>
        </div>
        
        <div className="mb-6">
          <a
            href="/order-tracking"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Go to Order Tracking
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto mb-6 scrollbar-hide">
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              selectedTab === 'all' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            All Orders ({orderStats.total})
          </button>
          <button
            onClick={() => setSelectedTab('processing')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              selectedTab === 'processing' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Processing ({orderStats.processing})
          </button>
          <button
            onClick={() => setSelectedTab('shipped')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              selectedTab === 'shipped' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Shipped ({orderStats.shipped})
          </button>
          <button
            onClick={() => setSelectedTab('delivered')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              selectedTab === 'delivered' 
                ? 'bg-green-600 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Delivered ({orderStats.delivered})
          </button>
          <button
            onClick={() => setSelectedTab('cancelled')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              selectedTab === 'cancelled' 
                ? 'bg-red-600 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Cancelled ({orderStats.cancelled})
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders or items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Filters</span>
              {showFilters ? <ChevronUp className="w-5 h-5 ml-2" /> : <ChevronDown className="w-5 h-5 ml-2" />}
            </button>
          </div>
        </div>
        
        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Order Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="All">All Status</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Order Date</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="All">All Time</option>
                <option value="Last 30 days">Last 30 days</option>
                <option value="Last 3 months">Last 3 months</option>
                <option value="Last 6 months">Last 6 months</option>
                <option value="Last year">Last year</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <Filter className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No orders match your filters</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('All');
              setDateFilter('All');
              setSelectedTab('all');
            }}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Order Summary Header */}
              <button
                onClick={() => toggleOrderDetails(order.id)}
                className="w-full p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center text-left cursor-pointer transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                aria-expanded={expandedOrderId === order.id}
                aria-controls={`order-details-${order.id}`}
              >
                <div className="flex-1 mb-4 lg:mb-0">
                  <div className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    <Package className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-mono">{order.id}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <span className="hidden sm:inline">•</span>
                    <div className="flex items-center">
                      <Package className="w-4 h-4 mr-1" />
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                  <div className="flex flex-col items-start lg:items-end">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center mb-2 ${getStatusClasses(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                    <div className="flex items-center text-xl font-bold text-gray-900 dark:text-white">
                      <DollarSign className="w-5 h-5 mr-1 text-green-600 dark:text-green-400" />
                      ${order.total.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {order.status !== 'Cancelled' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          trackOrder(order.trackingNumber);
                        }}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                        title="Track Order"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadInvoice(order.id);
                      }}
                      className="p-2 text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="Download Invoice"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <ChevronDown className={`w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${expandedOrderId === order.id ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </button>

              {/* Order Details Accordion Content */}
              {expandedOrderId === order.id && (
                <div
                  id={`order-details-${order.id}`}
                  className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
                >
                  <div className="p-6">
                    {/* Order Information Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg flex items-center">
                          <Info className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                          Order Information
                        </h4>
                        
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Delivery Address</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{order.deliveryAddress}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <CreditCard className="w-5 h-5 text-gray-500 mr-2" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Payment Method</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{order.paymentMethod}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg flex items-center">
                          <Truck className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                          Tracking Information
                        </h4>
                        
                        <div className="flex items-center">
                          <Shield className="w-5 h-5 text-gray-500 mr-2" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Tracking Number</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-mono">{order.trackingNumber}</p>
                          </div>
                        </div>
                        
                        {order.estimatedDelivery && (
                          <div className="flex items-center">
                            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Estimated Delivery</p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Items List */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-4 flex items-center">
                        <ShoppingCart className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Order Items
                      </h4>
                      <div className="space-y-4">
                        {order.items.map(item => (
                          <div key={item.id} className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-md mr-4 flex-shrink-0"
                            />
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 dark:text-white text-lg">{item.name}</p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Quantity: {item.quantity}</p>
                              <p className="text-indigo-600 dark:text-indigo-400 font-bold text-md">${item.price.toFixed(2)} each</p>
                              {item.rating > 0 && (
                                <div className="flex items-center mt-2">
                                  {renderStars(item.rating)}
                                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Your Rating</span>
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-gray-900 dark:text-white text-lg">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              {order.status === 'Delivered' && item.rating === 0 && (
                                <button 
                                  className="block mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                                  onClick={() => alert(`Rating item: ${item.name}`)}
                                >
                                  Rate Item
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h5>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                        <span className="font-medium">${order.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                        <span className="font-medium">Free</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Tax</span>
                        <span className="font-medium">$0.00</span>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      {order.status !== 'Cancelled' && (
                        <>
                          <button
                            onClick={() => reorderItems(order)}
                            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                          >
                            <Repeat className="w-5 h-5 mr-2" />
                            Reorder
                          </button>
                          <button
                            onClick={() => trackOrder(order.trackingNumber)}
                            className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium"
                          >
                            <Truck className="w-5 h-5 mr-2" />
                            Track Package
                          </button>
                          {order.status === 'Delivered' && (
                            <button
                              onClick={() => requestReturn(order.id)}
                              className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium"
                            >
                              <RefreshCw className="w-5 h-5 mr-2" />
                              Request Return
                            </button>
                          )}
                        </>
                      )}
                      <button
                        onClick={() => downloadInvoice(order.id)}
                        className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download Invoice
                      </button>
                      <button
                        onClick={() => contactSupport(order.id)}
                        className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium"
                      >
                        <HelpCircle className="w-5 h-5 mr-2" />
                        Contact Support
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer Help Section */}
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-2" />
          Need Help With Your Orders?
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <Phone className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Call Customer Service</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">We're available 24/7 to help with your order questions</p>
              <a href="tel:+254700123456" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                +254 700 123 456
              </a>
            </div>
          </div>
          <div className="flex items-start">
            <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Email Support</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Send us an email and we'll respond within 24 hours</p>
              <a href="mailto:support@afrovogue.com" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                support@afrovogue.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;