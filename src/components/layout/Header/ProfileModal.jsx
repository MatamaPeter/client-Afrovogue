import { Package, Settings, HelpCircle, LogOut, MapPin, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import Modal from './Modal.jsx';


const ProfileModal = ({ 
  isOpen, 
  onClose, 
  user,
  setIsLoggedIn,
  setUser
}) => {
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setUser(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="My Account">
      <div className="space-y-6">
        {/* User Profile Header */}
        <div className="text-center pb-6 border-b border-gray-200 dark:border-gray-700">
          {user && (
            <>
              <div className="relative mx-auto mb-4">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-indigo-100 dark:border-indigo-900/50 shadow-md"
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
            </>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Link
            to="/orders"
            onClick={onClose}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
          >
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-1.5">
              <Package size={18} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-xs font-medium">Orders</span>
          </Link>

          <Link
            to="/account/settings"
            onClick={onClose}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
          >
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-1.5">
              <Settings size={18} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-xs font-medium">Settings</span>
          </Link>

          <Link
            to="/faqs"
            onClick={onClose}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
          >
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-1.5">
              <HelpCircle size={18} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-xs font-medium">Help</span>
          </Link>
        </div>
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 py-3 px-4 rounded-lg border border-red-100 dark:border-red-900/30 transition-all duration-200 mt-4 touch-manipulation"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </Modal>
  );
};

export default ProfileModal;