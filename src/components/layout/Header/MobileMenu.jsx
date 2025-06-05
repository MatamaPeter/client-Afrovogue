import { X, Package, Settings, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  navItems,
  user 
}) => {
  return (
    <div className={`fixed inset-0 bg-black/30 backdrop-blur-lg z-50 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        className={`bg-white dark:bg-gray-900 w-80 max-w-[85vw] h-full shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Menu</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className="block text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 py-3 px-4 rounded-lg transition-all duration-200 text-base font-medium touch-manipulation"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4 mb-4">
              {user && (
                <>
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100 dark:border-indigo-900/50"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                    <div className="text-sm text-indigo-600">{user.membership}</div>
                  </div>
                </>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Link 
                to="/orders" 
                onClick={onClose}
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 py-2 px-3 rounded-lg transition-all duration-200 text-sm touch-manipulation"
              >
                <Package size={16} />
                <span>Orders</span>
              </Link>
              <Link 
                to="/account/settings" 
                onClick={onClose}
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 py-2 px-3 rounded-lg transition-all duration-200 text-sm touch-manipulation"
              >
                <Settings size={16} />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;