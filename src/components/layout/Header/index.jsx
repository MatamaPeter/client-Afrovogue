import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Heart, User, Moon, Sun, Bell, Menu } from "lucide-react";
import { CartWishlistContext } from "../../../context/CartWishlistContext";
import { ThemeContext } from "../../../context/ThemeContext";
import products from "../../../assets/data";
import notifications from "../../../assets/notifications";

// Import modular components
import Modal from "./Modal";
import CartModal from "./CartModal";
import WishlistModal from "./WishlistModal";
import ProfileModal from "./ProfileModal";
import NotificationsModal from "./NotificationsModal";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import NavItems from "./NavItems";

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
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Generate categories from products
  const categories = Array.from(new Set(products.map(product => product.category))).map(cat => {
    return { name: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' & ') };
  });

  // Navigation items
  const navItems = [
    { name: "Shop", path: "/shop" },
    ...categories.map(category => ({
      name: category.name,
      path: `/shop?category=${category.name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`
    })),
    { name: "Custom Order", path: "/custom-order" },
    { name: "Orders", path: "/orders" }
  ];

  // Mock user state - replace with your auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(loggedInUser));
    }

    const handleStorageChange = (event) => {
      if (event.key === 'loggedInUser') {
        if (event.newValue) {
          setIsLoggedIn(true);
          setUser(JSON.parse(event.newValue));
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Close mobile menu when window is resized
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

  // Helper functions
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  // Filter notifications by current user id
  const userNotifications = user ? notifications.filter(n => n.userId === user.id) : [];

  return (
    <>
      <header className={`bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-sm backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation"
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>

            {/* Logo */}
            <div className="flex items-center flex-1 lg:flex-initial justify-center lg:justify-start">
              <Link to="/" className="flex items-center space-x-3 sm:space-x-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md">
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <span>
                      <img
                        src={darkMode ? "/logo_light.png" : "/logo.png"}
                        alt="AfroVogue"
                        className="h-8 sm:h-10 lg:h-12 w-auto transition-all duration-300 hover:scale-105"
                      />
                    </span>
                  </div>
                </div>
                <span className="flex flex-col -space-y-1 hidden sm:block">
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Afrivogue
                  </h1>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">proudly African</div>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1 mx-6">
              <NavItems items={navItems} />
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Desktop Search Bar */}
              <SearchBar darkMode={darkMode} />

              {/* Mobile Search Icon */}
              <button 
                onClick={() => setShowMobileSearch(true)}
                className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              {/* Wishlist */}
              <button 
                onClick={() => setShowWishlistModal(true)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 group touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="Wishlist"
              >
                <Heart size={18} strokeWidth={1.5} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              {/* Notifications */}
              {isLoggedIn && (
                <button
                  onClick={() => setShowNotificationsModal(true)}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 group touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  title="Notifications"
                  aria-label="Notifications"
                >
                  <Bell size={18} strokeWidth={1.5} />
                  {userNotifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      {userNotifications.length}
                    </span>
                  )}
                </button>
              )}

              {/* Shopping Cart */}
              <button 
                onClick={() => setShowCartModal(true)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 group touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="Shopping cart"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
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
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-label="User profile"
                >
                  <User size={18} strokeWidth={1.5} />
                </button>
              ) : (
                <button
                  onClick={() => navigate('/auth/login')}
                  className="hidden sm:inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  Sign In
                </button>
              )}

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label={`Toggle ${darkMode ? 'light' : 'dark'} mode`}
              >
                {darkMode ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <SearchBar 
            isMobile 
            onCloseMobileSearch={() => setShowMobileSearch(false)} 
            darkMode={darkMode}
          />
        )}
      </header>

      {/* Mobile Navigation Menu */}
      <MobileMenu 
        isOpen={showMobileMenu} 
        onClose={closeMobileMenu} 
        navItems={navItems}
        user={user}
      />

      {/* Cart Modal */}
      <CartModal 
        isOpen={showCartModal} 
        onClose={() => setShowCartModal(false)} 
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateCartQuantity={updateCartQuantity}
        getTotalPrice={getTotalPrice}
        getTotalItems={getTotalItems}
      />

      {/* Wishlist Modal */}
      <WishlistModal 
        isOpen={showWishlistModal} 
        onClose={() => setShowWishlistModal(false)} 
        wishlistItems={wishlistItems}
        updateWishlistItemSize={updateWishlistItemSize}
        addToCart={addToCart}
        cartItems={cartItems}
        updateCartQuantity={updateCartQuantity}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
        notifications={userNotifications}
      />

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
        user={user}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />
    </>
  );
};

export default Header;