import { X, Package, Settings, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  navItems,
  user 
}) => {
  return (
    <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Overlay with subtle gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-black/30 to-purple-900/10 backdrop-blur-sm ${isOpen ? 'scale-100' : 'scale-95'}`}
        onClick={onClose}
      />
      
      {/* Menu container */}
      <div 
        className={`relative bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl w-80 max-w-[85vw] h-full shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] overflow-y-auto border-r border-white/20 dark:border-gray-800/30 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header with glass effect */}
        <div className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-100/50 dark:border-gray-800/50 p-5 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent tracking-tight">
            Navigation
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full transition-all hover:bg-gray-100/80 dark:hover:bg-gray-800/80 active:scale-95"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" />
          </button>
        </div>

        {/* Main content */}
        <div className="p-5">
          {/* Navigation items */}
          <nav className="space-y-1">
            {navItems.map((item, index) => (
              <Link
                to={item.path}
                key={item.path}
                onClick={onClose}
                className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50/80 dark:hover:bg-gray-800/50 py-3 px-4 rounded-xl transition-all duration-200 text-base font-medium cursor-pointer active:scale-[0.98]"
                style={{
                  transitionDelay: `${index * 30}ms`,
                  transform: isOpen ? 'none' : 'translateX(-10px)',
                  opacity: isOpen ? 1 : 0
                }}
              >
                {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          {/* User profile section */}
          {user && (
            <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-gray-800 dark:to-gray-800/70 rounded-xl shadow-sm border border-gray-100/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/80 dark:border-gray-700 shadow-md"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
                </div>
                <div className="overflow-hidden">
                  <div className="font-semibold text-gray-900 dark:text-white truncate">{user.name}</div>
                  <div className="text-xs bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-medium">
                    {user.membership}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Quick actions */}
          <div className="mt-6 pt-5 border-t border-gray-100/50 dark:border-gray-800/50">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-3">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Package, label: "Orders", path: "/orders" },
                { icon: Settings, label: "Settings", path: "/account/settings" },
                { icon: HelpCircle, label: "Help", path: "/help" }
              ].map((item, index) => (
                <Link
                  to={item.path}
                  key={item.label}
                  onClick={onClose}
                  className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg transition-all hover:bg-gray-50/80 dark:hover:bg-gray-800/50 active:scale-[0.98]"
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    transform: isOpen ? 'none' : 'translateY(5px)',
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <item.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;