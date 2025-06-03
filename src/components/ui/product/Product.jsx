/* eslint-disable no-unused-vars */
import { useContext, useState, useCallback, useMemo } from 'react';
import { FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { CartWishlistContext } from '../../../context/CartWishlistContext';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-toastify';

function Product({ product }) {
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useContext(CartWishlistContext);
  
  const [isHovered, setIsHovered] = useState(false);
  const [quantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const inWishlist = isInWishlist(product.id);
  const isOutOfStock = product.inStock === false || product.stock === 0;

  // Memoized calculations
  const discountedPrice = useMemo(() => {
    return product.discount > 0 && product.originalPrice 
      ? product.originalPrice - (product.originalPrice * product.discount / 100)
      : product.price;
  }, [product.discount, product.originalPrice, product.price]);

  const stockStatus = useMemo(() => {
    if (isOutOfStock) return { status: 'out', color: 'red', text: 'Out of Stock' };
    if (product.stock > 10) return { status: 'high', color: 'green', text: 'In Stock' };
    if (product.stock > 5) return { status: 'medium', color: 'yellow', text: `Only ${product.stock} left` };
    return { status: 'low', color: 'red', text: `Only ${product.stock} left` };
  }, [product.stock, isOutOfStock]);

  // Optimized event handlers
  const toggleWishlist = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (inWishlist) {
        removeFromWishlist(product.id);
        toast.success('Removed from wishlist');
      } else {
        addToWishlist(product);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  }, [inWishlist, product, addToWishlist, removeFromWishlist]);

  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isOutOfStock) {
      toast.error(`${product.name} is out of stock!`);
      return;
    }
    
    if (!selectedSize && product.sizes?.length > 0) {
      toast.error('Please select a size before adding to cart.');
      return;
    }
    
    try {
      addToCart({ ...product, quantity, selectedSize });
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      toast.error('Failed to add item to cart. Please try again.');
    }
  }, [isOutOfStock, selectedSize, product, quantity, addToCart]);

  const handleSizeSelect = useCallback((e, size) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  // Animation variants
  const actionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -8 }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Render star rating
  const renderStars = () => (
    <div className="flex text-amber-400 mr-2">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05, duration: 0.2 }}
        >
          {i < Math.floor(product.rating) ? (
            <FaStar className="text-base" />
          ) : (
            <FaRegStar className="text-base text-gray-300 dark:text-gray-600" />
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <motion.div 
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full"
    >
      <Link 
        to={`/shop/${product.id}`} 
        className="block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`View ${product.name} details`}
      >
        <article className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
          
          {/* Product Image Section */}
          <div className="relative overflow-hidden h-72 sm:h-64 lg:h-72 xl:h-80">
            <div className="relative h-full w-full bg-gray-100 dark:bg-gray-800">
              
              {/* Loading Skeleton */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
                </div>
              )}

              {/* Product Image */}
              {!imageError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <FiEye className="mx-auto mb-2 text-4xl" />
                    <p className="text-sm">Image not available</p>
                  </div>
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {/* Discount Badge */}
                {product.discount > 0 && (
                  <motion.div 
                    className="bg-gradient-to-r from-red-500 to-red-700 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg"
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
                  >
                    -{product.discount}%
                  </motion.div>
                )}

                {/* New Product Badge */}
                {product.isNew && (
                  <motion.div 
                    className="bg-gradient-to-r from-green-500 to-green-700 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg"
                    initial={{ scale: 0, rotate: 10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.3, type: "spring" }}
                  >
                    NEW
                  </motion.div>
                )}
              </div>

              {/* Out of Stock Badge */}
              {isOutOfStock && (
                <div className="absolute top-4 right-4 bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md opacity-90">
                  OUT OF STOCK
                </div>
              )}
              
              {/* Quick Actions Overlay */}
              <AnimatePresence>
                {isHovered && !isOutOfStock && (
                  <motion.div 
                    className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center space-x-4"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.2 }}
                  >
                    {/* Wishlist Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleWishlist}
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 text-xl backdrop-blur-sm
                        ${inWishlist 
                          ? 'bg-red-500 text-white hover:bg-red-600' 
                          : 'bg-white/90 text-gray-700 hover:bg-white'
                        }`}
                      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                      variants={actionVariants}
                      transition={{ delay: 0.1 }}
                    >
                      <FiHeart className={inWishlist ? 'fill-current' : ''} />
                    </motion.button>
                    
                    {/* Add to Cart Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleAddToCart}
                      className="w-12 h-12 rounded-full bg-white/90 text-gray-700 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-200 text-xl backdrop-blur-sm"
                      aria-label="Add to cart"
                      variants={actionVariants}
                      transition={{ delay: 0.2 }}
                    >
                      <FiShoppingBag />
                    </motion.button>

                    {/* Quick View Button */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      variants={actionVariants}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-white/90 text-gray-700 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-200 text-xl backdrop-blur-sm">
                        <FiEye />
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Out of Stock Overlay */}
                {isHovered && isOutOfStock && (
                  <motion.div 
                    className="absolute inset-0 bg-gray-900/70 flex items-center justify-center backdrop-blur-sm"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-white text-lg font-bold">Out of Stock</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="p-5 flex flex-col flex-grow">
            
            {/* Product Name and Price */}
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight pr-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {product.name}
              </h3>
              <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discount > 0 && product.originalPrice && (
                  <span className="line-through text-sm text-gray-500 dark:text-gray-400">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {renderStars()}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({product.reviews?.length || 0})
                </span>
              </div>
              
              {/* Rating Score */}
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {product.rating.toFixed(1)}
              </span>
            </div>

            {/* Category */}
            {product.category && (
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full capitalize">
                  {product.category}
                </span>
              </div>
            )}

            {/* Available Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Available Sizes:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={(e) => handleSizeSelect(e, size)}
                      className={`px-3 py-1 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
                        selectedSize === size
                          ? 'border-indigo-600 bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-indigo-100'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-500'
                      }`}
                      aria-pressed={selectedSize === size}
                      aria-label={`Select size ${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status Indicator */}
            {!isOutOfStock && product.stock && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Stock:</span>
                  <span className={`font-semibold text-${stockStatus.color}-600`}>
                    {stockStatus.text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 bg-${stockStatus.color}-500`}
                    style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="mt-auto">
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: isOutOfStock ? 1 : 1.02 }}
                whileTap={{ scale: isOutOfStock ? 1 : 0.98 }}
                className={`w-full py-3 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isOutOfStock 
                    ? 'bg-gray-400 dark:bg-gray-700 text-gray-100 cursor-not-allowed focus:ring-gray-400' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 shadow-lg hover:shadow-xl focus:ring-indigo-500'
                }`}
                disabled={isOutOfStock}
                aria-label={isOutOfStock ? 'Product out of stock' : 'Add product to cart'}
              >
                {!isOutOfStock && (
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"
                    whileHover={{ opacity: 0.1 }}
                  />
                )}
                <FiShoppingBag className="text-xl" />
                <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
              </motion.button>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export default Product;