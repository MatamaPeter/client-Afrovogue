import React, { useState, useContext, useEffect, useRef, useMemo, useCallback } from 'react';
import { CartWishlistContext } from '../../context/CartWishlistContext';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart, FiHeart, FiShare2, FiStar, FiCheck, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import products from '../../assets/data';
import SizeGuide from './../../components/ui/product/SizeGuide';
import ProductGallery from './../../components/ui/product/ProductGallery';
import ReviewSection from './../../components/ui/product/ReviewSection';

// Custom hook for managing toast notifications
const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  }, []);

  return { toasts, addToast };
};

// Toast component
const Toast = ({ toast }) => (
  <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
    toast.type === 'success' ? 'bg-green-500 text-white' : 
    toast.type === 'error' ? 'bg-red-500 text-white' : 
    'bg-blue-500 text-white'
  }`}>
    <div className="flex items-center gap-2">
      {toast.type === 'success' && <FiCheck className="w-5 h-5" />}
      <span>{toast.message}</span>
    </div>
  </div>
);

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  </div>
);

// Error boundary component
const ProductNotFound = ({ onBackToShop }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center bg-white dark:bg-gray-900 rounded-lg shadow-xl mt-8">
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <FiArrowLeft className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Oops! The product you're looking for doesn't exist or has been removed.
      </p>
      <button
        onClick={onBackToShop}
        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label="Return to shop"
      >
        <FiArrowLeft className="mr-2" /> Back to Shop
      </button>
    </div>
  </div>
);

// Enhanced breadcrumb component
const Breadcrumb = ({ product }) => (
  <nav className="flex mb-6 text-sm sm:text-base" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-3">
      <li className="inline-flex items-center">
        <Link 
          to="/" 
          className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors inline-flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
        >
          Home
        </Link>
      </li>
      <li>
        <div className="flex items-center">
          <span className="text-gray-400 mx-1 md:mx-2" aria-hidden="true">/</span>
          <Link 
            to="/shop" 
            className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
          >
            Shop
          </Link>
        </div>
      </li>
      <li aria-current="page">
        <div className="flex items-center">
          <span className="text-gray-400 mx-1 md:mx-2" aria-hidden="true">/</span>
          <span className="text-gray-500 dark:text-gray-400 font-medium truncate max-w-[150px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </li>
    </ol>
  </nav>
);

// Enhanced rating display component
const RatingDisplay = ({ rating, reviewCount, onReadReviews }) => (
  <div className="flex items-center mb-5">
    <div className="flex items-center mr-2" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          className={`w-5 h-5 transition-colors duration-200 ${
            star <= Math.round(rating) 
              ? 'text-yellow-400 fill-current' 
              : 'text-gray-300 dark:text-gray-600'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
    <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
      {rating} ({reviewCount || 0} reviews)
    </span>
    {reviewCount > 0 && (
      <button
        onClick={onReadReviews}
        className="ml-3 text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
        aria-label="Read all product reviews"
      >
        Read all reviews
      </button>
    )}
  </div>
);

// Enhanced size selector component
const SizeSelector = ({ sizes, selectedSize, onSizeSelect, onShowSizeGuide }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-3">
      <label className="block text-base font-medium text-gray-900 dark:text-gray-200">
        Select Size {selectedSize && <span className="text-indigo-600 dark:text-indigo-400">({selectedSize})</span>}
      </label>
      <button
        onClick={onShowSizeGuide}
        className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
        aria-label="Open size guide"
      >
        Size Guide
      </button>
    </div>
    <fieldset>
      <legend className="sr-only">Choose a size</legend>
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {sizes.map((sizeOption) => (
          <button
            key={sizeOption.size}
            onClick={() => sizeOption.inStock && onSizeSelect(sizeOption.size)}
            disabled={!sizeOption.inStock}
            className={`py-2 px-3 border rounded-md text-center font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500
              ${
                selectedSize === sizeOption.size
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105'
                  : 'border-gray-300 hover:border-indigo-500 dark:border-gray-600 dark:hover:border-indigo-400 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }
              ${
                !sizeOption.inStock
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through opacity-70 dark:bg-gray-700 dark:text-gray-500'
                  : ''
              }
            `}
            title={!sizeOption.inStock ? `${sizeOption.size} - Out of Stock` : `Select size ${sizeOption.size}`}
            aria-label={`Size ${sizeOption.size} ${!sizeOption.inStock ? '- Out of Stock' : ''}`}
          >
            {sizeOption.size}
          </button>
        ))}
      </div>
    </fieldset>
    {!selectedSize && (
      <p className="mt-3 text-sm text-red-600 dark:text-red-400" role="alert">
        Please select a size to add to cart.
      </p>
    )}
  </div>
);

// Enhanced quantity selector component
const QuantitySelector = ({ quantity, onQuantityChange }) => (
  <div className="mb-8">
    <label htmlFor="quantity-input" className="block text-base font-medium text-gray-900 dark:text-gray-200 mb-3">
      Quantity
    </label>
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 h-10 w-10 rounded-lg flex items-center justify-center text-xl font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
      >
        -
      </button>
      <input
        id="quantity-input"
        type="number"
        value={quantity}
        onChange={(e) => onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-center h-10 w-20 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
        min="1"
        max="99"
        aria-live="polite"
      />
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 h-10 w-10 rounded-lg flex items-center justify-center text-xl font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Increase quantity"
        disabled={quantity >= 99}
      >
        +
      </button>
    </div>
  </div>
);

// Trust badges component
const TrustBadges = () => (
  <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="flex flex-col items-center">
        <FiTruck className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
        <span className="text-xs text-gray-600 dark:text-gray-400">Free Shipping</span>
      </div>
      <div className="flex flex-col items-center">
        <FiRefreshCw className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
        <span className="text-xs text-gray-600 dark:text-gray-400">Easy Returns</span>
      </div>
      <div className="flex flex-col items-center">
        <FiShield className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
        <span className="text-xs text-gray-600 dark:text-gray-400">Secure Payment</span>
      </div>
    </div>
  </div>
);

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toasts, addToast } = useToast();
  
  // State management
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Refs
  const productInfoRef = useRef(null);
  const reviewsSectionRef = useRef(null);

  // Context
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useContext(CartWishlistContext);

  // Memoized product data
  const product = useMemo(() => 
    products.find(p => p.id.toString() === productId), 
    [productId]
  );

  const [reviews, setReviews] = useState(product?.reviews || []);

  // Memoized calculations
  const availableSizes = useMemo(() => 
    product?.sizes?.map(size => ({
      size,
      inStock: true, // This should come from real inventory data
    })) || [], 
    [product]
  );

  const averageRating = useMemo(() => {
    if (product?.reviews?.length > 0) {
      return (product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length).toFixed(1);
    }
    return product?.rating || 0;
  }, [product]);

  const relatedProducts = useMemo(() => 
    products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4),
    [product]
  );

  // Effects
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [productId]);

  useEffect(() => {
    if (product) {
      setIsWishlisted(isInWishlist(product.id));
      setReviews(product.reviews || []);
    }
  }, [product, isInWishlist]);

  // Event handlers
  const handleBackToShop = useCallback(() => {
    navigate('/shop');
  }, [navigate]);

  const handleAddToCart = useCallback(() => {
    if (!selectedSize) {
      addToast('Please select a size first!', 'error');
      return;
    }
    
    try {
      addToCart({ ...product, selectedSize, quantity });
      addToast(`${product.name} (Size: ${selectedSize}) added to cart!`, 'success');
    } catch (error) {
      addToast('Failed to add item to cart. Please try again.', error);
    }
  }, [selectedSize, product, quantity, addToCart, addToast]);

  const toggleWishlist = useCallback(() => {
    try {
      if (isWishlisted) {
        removeFromWishlist(product.id);
        setIsWishlisted(false);
        addToast(`${product.name} removed from wishlist`, 'success');
      } else {
        addToWishlist({ ...product, selectedSize, quantity });
        setIsWishlisted(true);
        addToast(`${product.name} added to wishlist!`, 'success');
      }
    } catch (error) {
      addToast('Failed to update wishlist. Please try again.', error);
    }
  }, [isWishlisted, product, selectedSize, quantity, addToWishlist, removeFromWishlist, addToast]);

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.shortDescription,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        addToast('Product link copied to clipboard!', 'success');
      }
    } catch (error) {
      addToast('Failed to share product. Please try again.', error);
    }
  }, [product, addToast]);

  const handleReadReviews = useCallback(() => {
    setActiveTab('reviews');
    setTimeout(() => {
      reviewsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  // Loading state
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Product not found
  if (!product) {
    return <ProductNotFound onBackToShop={handleBackToShop} />;
  }

  return (
    <>
      {/* Toast notifications */}
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg my-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb product={product} />

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 mb-16">
          {/* Product Images */}
          <div className="lg:sticky lg:top-8 self-start">
            <ProductGallery 
              images={[product.image, ...(product.additionalImages || [])]} 
              productName={product.name}
            />
          </div>

          {/* Product Info */}
          <div className="lg:py-8" ref={productInfoRef}>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 leading-tight">
              {product.name}
            </h1>

            <RatingDisplay 
              rating={averageRating}
              reviewCount={product.reviews.length}
              onReadReviews={handleReadReviews}
            />

            {/* Price Section */}
            <div className="mb-6 flex items-baseline">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through ml-3 dark:text-gray-400">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.discount && (
                <span className="bg-red-500 text-white text-sm font-semibold ml-3 px-3 py-1 rounded-full animate-pulse dark:bg-red-600">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Size Selection */}
            <SizeSelector 
              sizes={availableSizes}
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
              onShowSizeGuide={() => setShowSizeGuide(true)}
            />

            {/* Quantity Selector */}
            <QuantitySelector 
              quantity={quantity}
              onQuantityChange={setQuantity}
            />

            {/* Trust Badges */}
            <TrustBadges />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 flex-1 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 dark:focus:ring-offset-gray-800"
                disabled={!selectedSize || !product.inStock}
                aria-label="Add selected product to cart"
              >
                <FiShoppingCart className="text-xl" /> 
                {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
              
              <button
                onClick={toggleWishlist}
                className={`border-2 transition-all duration-300 px-8 py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 flex-1 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-opacity-50 dark:focus:ring-offset-gray-800 ${
                  isWishlisted
                    ? 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/50 focus:ring-red-400'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 focus:ring-gray-400'
                }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <FiHeart className={`text-xl ${isWishlisted ? 'fill-current' : ''}`} /> 
                {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
              
              <button
                onClick={handleShare}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 px-5 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 sm:flex-initial shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label="Share this product"
              >
                <FiShare2 /> <span className="hidden sm:inline">Share</span>
              </button>
            </div>

            {/* Product Meta */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Category:</span>{' '}
                <span className="text-gray-700 dark:text-gray-300 capitalize">{product.category}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Availability:</span>{' '}
                <span className={`${product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">SKU:</span>{' '}
                <span className="text-gray-700 dark:text-gray-300">{product.sku || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Material:</span>{' '}
                <span className="text-gray-700 dark:text-gray-300">{product.material || 'Premium Cotton Blend'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mb-16" ref={reviewsSectionRef}>
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex flex-wrap space-x-4 sm:space-x-8" aria-label="Product Information Tabs">
              {[
                { id: 'description', label: 'Description' },
                { id: 'details', label: 'Details' },
                { id: 'reviews', label: `Reviews (${reviews.length})` },
                { id: 'shipping', label: 'Shipping & Returns' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-3 font-semibold text-base transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-t-md ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`${tab.id}-panel`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="py-6 bg-gray-50 dark:bg-gray-700 rounded-b-lg px-6 shadow-inner">
            {activeTab === 'description' && (
              <div className="prose dark:prose-invert max-w-none" role="tabpanel" id="description-panel">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Product</h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
            
            {activeTab === 'details' && (
              <div className="prose dark:prose-invert max-w-none" role="tabpanel" id="details-panel">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Technical Details & Features</h3>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                  {product.details?.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  )) || (
                    <li className="text-gray-500 dark:text-gray-400 italic">
                      No extensive details available at this time.
                    </li>
                  )}
                </ul>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div role="tabpanel" id="reviews-panel">
                <ReviewSection 
                  productId={productId} 
                  reviews={reviews} 
                  setReviews={setReviews}
                  averageRating={averageRating}
                />
              </div>
            )}
            
            {activeTab === 'shipping' && (
              <div className="prose dark:prose-invert max-w-none" role="tabpanel" id="shipping-panel">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Shipping & Returns Information</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center">
                      <FiTruck className="mr-2" /> Standard Shipping
                    </h4>
                    <p>Get your items in 3-5 business days for just $5.99. Enjoy <span className="font-semibold text-green-600 dark:text-green-400">FREE Standard Shipping</span> on all orders over $50!</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center">
                      <FiTruck className="mr-2" /> Express Shipping
                    </h4>
                    <p>Need it faster? Opt for Express Shipping and receive your order in 1-2 business days for $12.99.</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2 flex items-center">
                      <FiRefreshCw className="mr-2" /> Easy Returns
                    </h4>
                    <p>Your satisfaction is our priority. You have 30 days from the purchase date to return items. Please ensure products are unused, in their original packaging, and with all tags attached. Refunds are processed within 5-7 business days upon receipt of the returned item.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              You Might Also Love These
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div 
                  key={p.id} 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 group focus-within:ring-2 focus-within:ring-indigo-500"
                >
                  <Link 
                    to={`/shop/${p.id}`} 
                    className="block relative focus:outline-none"
                    aria-label={`View ${p.name} product details`}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                      <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Product
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {p.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                            ${p.price.toFixed(2)}
                          </p>
                          {p.originalPrice && (
                            <p className="text-sm text-gray-500 line-through dark:text-gray-400">
                              ${p.originalPrice.toFixed(2)}
                            </p>
                          )}
                        </div>
                        {p.rating && (
                          <div className="flex items-center">
                            <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                              {p.rating}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Size Guide Modal */}
        <SizeGuide 
          open={showSizeGuide} 
          onClose={() => setShowSizeGuide(false)} 
          productCategory={product.category}
        />
      </div>
    </>
  );
};

export default ProductDetails;