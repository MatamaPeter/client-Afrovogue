import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'; // Import PropTypes
import { Search, ShoppingBag, Heart, User, Moon, Sun, X, Plus, Minus, Star, Settings, Package, HelpCircle, LogOut, Menu } from "lucide-react";
import { CartWishlistContext } from "../../context/CartWishlistContext";
import { ThemeContext } from "../../context/ThemeContext";

// Define common icon size for consistency (optional, can be overridden)
const ICON_SIZE_DEFAULT = 18;
const ICON_SIZE_LARGE = 20;

const Header = () => {
  const {
    cartItems,
    wishlistItems,
    removeFromCart,
    updateCartQuantity,
    addToCart,
    updateWishlistItemSize,
  } = useContext(CartWishlistContext);

  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const [showCartModal, setShowCartModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const navItems = [
    { name: "Shop", path: "/shop" },
    { name: "Women", path: "/shop?category=women" },
    { name: "Men", path: "/shop?category=men" },
    { name: "Kids", path: "/shop?category=kids" },
    { name: "His & Hers", path: "/shop?category=his-hers" },
    { name: "Custom Order", path: "/custom-order" },
    { name: "Orders", path: "/orders" }
  ];

  // Mock user state - replace with your auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        setIsLoggedIn(true);
        try {
          setUser(JSON.parse(loggedInUser));
        } catch (e) {
          console.error("Failed to parse loggedInUser from localStorage", e);
          setIsLoggedIn(false);
          setUser(null);
          localStorage.removeItem('loggedInUser'); // Clear invalid data
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkUser(); // Initial check

    const handleStorageChange = (event) => {
      if (event.key === 'loggedInUser') {
        checkUser(); // Re-check when storage changes
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Clear search input after search on desktop and mobile
  const handleSearch = (query) => {
    if (query.trim() !== '') {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setSearchQuery('');
      setShowMobileSearch(false);
    }
  };

  // Close mobile menu/search when window resizes to desktop or route changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowMobileMenu(false);
        setShowMobileSearch(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect to close modals when route changes (e.g., if user navigates away while modal is open)
  useEffect(() => {
    const handleRouteChange = () => {
      setShowCartModal(false);
      setShowWishlistModal(false);
      setShowProfileModal(false);
      setShowMobileMenu(false);
      setShowMobileSearch(false);
    };

    window.addEventListener('popstate', handleRouteChange); // For browser back/forward
    // For react-router navigation, you might listen to location changes if needed
    // const unlisten = history.listen(handleRouteChange); // Example for older react-router
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      // unlisten();
    };
  }, []); // Empty dependency array means it runs once on mount

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50 flex items-start justify-end">
        <div
          className="fixed inset-0"
          onClick={onClose}
          aria-label="Close modal"
        ></div>
        <div className="bg-white dark:bg-gray-900 w-full max-w-md h-full shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto">
          <div className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 p-4 sm:p-5 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation"
              aria-label="Close"
            >
              <X size={ICON_SIZE_LARGE} />
            </button>
          </div>
          <div className="p-4 sm:p-5">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // PropTypes for Modal component
  Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-5">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="lg:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation"
              aria-label="Open mobile menu"
            >
              <Menu size={ICON_SIZE_LARGE} />
            </button>

            {/* Logo */}
            <div className="flex items-center flex-1 lg:flex-initial justify-center lg:justify-start">
              <Link to="/" className="flex items-center space-x-3 sm:space-x-5" onClick={() => {
                // Close any open modals/menus when navigating via logo
                setShowMobileMenu(false);
                setShowMobileSearch(false);
              }}>
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <span>
                      <img
                        src={darkMode ? "/logo_light.png" : "/logo.png"}
                        alt="AfroVogue Logo"
                        className="h-8 sm:h-10 lg:h-12 w-auto transition-all duration-300"
                        onError={(e) => { e.target.onerror = null; e.target.src="/placeholder_logo.png"; }} // Fallback logo
                      />
                    </span>
                  </div>
                </div>
                <span className="flex flex-col -space-y-1 hidden sm:block">
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                    Afrivogue
                  </h1>
                  <div className="text-xs dark:text-white">proudly African</div>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all duration-200 font-medium text-sm uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Desktop Search Bar */}
              <div className={`relative hidden lg:flex items-center transition-all duration-200 ${searchFocused ? 'w-80' : 'w-56'}`}>
                <div className={`absolute inset-0 bg-gray-50 dark:bg-gray-800 rounded-full transition-all duration-200 ${searchFocused ? 'opacity-100' : 'opacity-60'}`}></div>
                  <input
                    type="text"
                    placeholder="Search collections..."
                    className="relative bg-transparent border-0 focus:ring-0 outline-none text-gray-900 dark:text-white py-2.5 px-4 pl-11 w-full text-sm"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch(searchQuery);
                      }
                    }}
                    aria-label="Search products"
                  />
                <Search className="absolute left-4 text-gray-500 dark:text-gray-400" size={ICON_SIZE_DEFAULT} />
              </div>

              {/* Mobile Search Icon */}
              <button
                onClick={() => setShowMobileSearch(true)}
                className="lg:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation"
                aria-label="Open search bar"
              >
                <Search size={ICON_SIZE_DEFAULT} />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setShowWishlistModal(true)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 group touch-manipulation"
                aria-label={`View your wishlist with ${wishlistItems.length} items`}
              >
                <Heart size={ICON_SIZE_DEFAULT} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart */}
              <button
                onClick={() => setShowCartModal(true)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 group touch-manipulation"
                aria-label={`View your shopping cart with ${getTotalItems()} items`}
              >
                <ShoppingBag size={ICON_SIZE_DEFAULT} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Profile or Login Button */}
              {isLoggedIn ? (
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation"
                  aria-label="Open profile menu"
                >
                  <User size={ICON_SIZE_DEFAULT} />
                </button>
              ) : (
                <Link
                  to="/auth/login"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation"
                  aria-label="Login or Sign Up"
                >
                  Login
                </Link>
              )}

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={ICON_SIZE_DEFAULT} /> : <Moon size={ICON_SIZE_DEFAULT} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search collections..."
                className="w-full bg-gray-50 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white py-3 px-4 pl-11 rounded-lg text-base"
                autoFocus
                // Removed onBlur to keep it open until explicitly closed by X or search
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(searchQuery);
                  }
                }}
                aria-label="Search products on mobile"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={ICON_SIZE_DEFAULT} />
              <button
                onClick={() => setShowMobileSearch(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                aria-label="Close mobile search"
              >
                <X size={ICON_SIZE_DEFAULT} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50 lg:hidden">
          <div
            className="fixed inset-0"
            onClick={closeMobileMenu}
            aria-label="Close mobile menu"
          ></div>
          <div className="bg-white dark:bg-gray-900 w-80 max-w-[85vw] h-full shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto">
            <div className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation"
                aria-label="Close menu"
              >
                <X size={ICON_SIZE_LARGE} />
              </button>
            </div>
            <div className="p-4">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className="block text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 py-3 px-4 rounded-lg transition-all duration-200 text-base font-medium touch-manipulation"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                {isLoggedIn && user && ( // Ensure user is logged in and user object exists
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100 dark:border-indigo-900/50"
                      onError={(e) => { e.target.onerror = null; e.target.src="/placeholder_avatar.png"; }} // Fallback avatar
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                      <div className="text-sm text-indigo-600">{user.membership}</div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/orders"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 py-2 px-3 rounded-lg transition-all duration-200 text-sm touch-manipulation"
                  >
                    <Package size={ICON_SIZE_DEFAULT} />
                    <span>Orders</span>
                  </Link>
                  <Link
                    to="/account/settings"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 py-2 px-3 rounded-lg transition-all duration-200 text-sm touch-manipulation"
                  >
                    <Settings size={ICON_SIZE_DEFAULT} />
                    <span>Settings</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      <Modal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        title={`Your Cart${getTotalItems() > 0 ? ` (${getTotalItems()})` : ''}`}
      >
            {cartItems.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">Your cart is empty</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Discover our latest collections</p>
                <Link to="/shop" onClick={() => setShowCartModal(false)} className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-6 rounded-lg font-semibold text-sm transition-colors duration-200">
                  Shop Now
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex items-center space-x-3 sm:space-x-4 bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                    onError={(e) => { e.target.onerror = null; e.target.src="/placeholder_product.png"; }} // Fallback product image
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">{item.name}</h3>
                    <p className="text-indigo-600 font-semibold text-sm sm:text-base">${item.price}</p>
                    {item.selectedSize && (
                      <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">Size: {item.selectedSize}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 bg-white dark:bg-gray-900 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.selectedSize, -1)}
                      className="text-gray-500 hover:text-indigo-600 transition-colors p-1 touch-manipulation"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-1 sm:px-2 text-gray-900 dark:text-white font-medium min-w-[20px] text-center text-sm sm:text-base">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.selectedSize, 1)}
                      className="text-gray-500 hover:text-indigo-600 transition-colors p-1 touch-manipulation"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      removeFromCart(item.id, item.selectedSize);
                    }}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-2 rounded-lg touch-manipulation"
                    title="Remove from Cart"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <X size={16} />
                  </button>
                </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6">
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">Total:</span>
                    <span className="text-xl font-bold text-indigo-600">${getTotalPrice()}</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowCartModal(false);
                      navigate("/checkout");
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 text-base sm:text-lg touch-manipulation"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
      </Modal>

      {/* Wishlist Modal */}
      <Modal
        isOpen={showWishlistModal}
        onClose={() => setShowWishlistModal(false)}
        title={`Saved Items${wishlistItems.length > 0 ? ` (${wishlistItems.length})` : ''}`}
      >
              {wishlistItems.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">Your wishlist is empty</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Save items you love for later</p>
                  <Link to="/shop" onClick={() => setShowWishlistModal(false)} className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-6 rounded-lg font-semibold text-sm transition-colors duration-200">
                    Explore Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 sm:space-x-4 bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                        onError={(e) => { e.target.onerror = null; e.target.src="/placeholder_product.png"; }} // Fallback product image
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">{item.name}</h3>
                      <p className="text-indigo-600 font-semibold text-sm sm:text-base">${item.price}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < Math.floor(item.rating) ? "text-indigo-600 fill-current" : "text-gray-300 dark:text-gray-600"}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-2">({item.rating})</span>
                      </div>
                      <div className="mt-2">
                        <label htmlFor={`size-select-${item.id}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Select Size
                        </label>
                        <select
                          id={`size-select-${item.id}`}
                          value={item.selectedSize || ''}
                          onChange={(e) => updateWishlistItemSize(item.id, e.target.value)}
                          className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-1.5 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          aria-label={`Select size for ${item.name}`}
                        >
                          <option value="" disabled>Select size</option>
                          <option value="XS">XS</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                          <option value="XXL">XXL</option>
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        // Add item to cart or increase quantity if already in cart
                        if (!item.selectedSize) {
                          alert('Please select a size before adding to cart.'); // Basic validation
                          return;
                        }
                        const existingItem = cartItems.find(cartItem => cartItem.id === item.id && cartItem.selectedSize === item.selectedSize);
                        if (existingItem) {
                          updateCartQuantity(item.id, item.selectedSize, 1);
                        } else {
                          addToCart({ ...item, quantity: 1 });
                        }
                        setShowWishlistModal(false); // Close wishlist modal after adding to cart
                        setShowCartModal(true); // Open cart modal
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 touch-manipulation whitespace-nowrap"
                      aria-label={`Add ${item.name} to cart`}
                    >
                      Add to Cart
                    </button>
                    </div>
                  ))}
                </div>
              )}
      </Modal>

      {/* Profile Modal */}
      <Modal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        title="My Account"
      >
        <div className="space-y-6">
          {/* User Profile Header */}
          {isLoggedIn && user ? ( // Ensure user is logged in and user object exists
            <div className="text-center pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="relative mx-auto mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-indigo-100 dark:border-indigo-900/50 shadow-md"
                    onError={(e) => { e.target.onerror = null; e.target.src="/placeholder_avatar.png"; }} // Fallback avatar
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {user.membership}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                <p className="text-gray-500 text-sm">{user.email}</p>

                <div className="mt-3 flex justify-center items-center space-x-4">
                  <div className="text-center">
                    <div className="text-indigo-600 font-bold">{user.points}</div>
                    <div className="text-xs text-gray-500">Reward Points</div>
                  </div>
                  <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-white">{user.orders}</div>
                    <div className="text-xs text-gray-500">Orders</div>
                  </div>
                </div>
            </div>
          ) : (
            <div className="text-center py-6 border-b border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-300 text-base mb-4">You are not logged in.</p>
                <Link
                  to="/auth/login"
                  onClick={() => setShowProfileModal(false)}
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-6 rounded-lg font-semibold text-sm transition-colors duration-200"
                >
                  Login / Sign Up
                </Link>
            </div>
          )}

          {isLoggedIn && (
            <>
              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-2">
                <Link to="/orders" onClick={() => setShowProfileModal(false)} className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-1.5">
                    <Package size={ICON_SIZE_DEFAULT} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-xs font-medium">Orders</span>
                </Link>
                <Link to="/account/settings" onClick={() => setShowProfileModal(false)} className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-1.5">
                    <Settings size={ICON_SIZE_DEFAULT} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-xs font-medium">Settings</span>
                </Link>
                <Link to="/help" onClick={() => setShowProfileModal(false)} className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-1.5">
                    <HelpCircle size={ICON_SIZE_DEFAULT} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-xs font-medium">Help</span>
                </Link>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => {
                  localStorage.removeItem('loggedInUser');
                  setIsLoggedIn(false);
                  setUser(null);
                  setShowProfileModal(false);
                  navigate("/"); // Redirect to homepage or login page after logout
                }}
                className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 py-3 px-4 rounded-lg border border-red-100 dark:border-red-900/30 transition-all duration-200 mt-4 touch-manipulation"
                aria-label="Sign out of your account"
              >
                <LogOut size={ICON_SIZE_DEFAULT} />
                <span>Sign Out</span>
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Header;