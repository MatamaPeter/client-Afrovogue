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
    // localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setUser(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="My Account">
      <div className="space-y-8">
        {/* User Profile Header */}
        <div className="text-center pb-8 border-b border-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800">
          {user && (
            <>
              <div className="relative mx-auto mb-6">
                <div className="relative">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white dark:border-gray-800 shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                  {user.membership}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{user.email}</p>
              
              <div className="flex justify-center items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{user.points}</div>
                  <div className="text-xs text-gray-500 mt-1">Reward Points</div>
                </div>
                <div className="h-8 w-px bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-700"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{user.orders}</div>
                  <div className="text-xs text-gray-500 mt-1">Orders</div>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Package, label: "Orders", path: "/orders" },
            { icon: Settings, label: "Settings", path: "/account/settings" },
            { icon: HelpCircle, label: "Help", path: "/faqs" }
          ].map((item, index) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 hover:from-indigo-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mb-3 shadow-sm">
                <item.icon size={20} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</span>
            </div>
          ))}
        </div>
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-3 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 py-4 px-6 rounded-2xl border-2 border-red-200/50 dark:border-red-800/30 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-1"
        >
          <LogOut size={20} />
          <span className="font-semibold">Sign Out</span>
        </button>
      </div>
    </Modal>
  );
};

export default ProfileModal;