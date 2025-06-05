import { Bell } from "lucide-react";
import Modal from './Modal.jsx';


const NotificationsModal = ({ 
  isOpen, 
  onClose, 
  notifications 
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Notifications${notifications.length > 0 ? ` (${notifications.length})` : ''}`}
    >
      {notifications.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Bell size={28} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-xl mb-3 font-medium">No new notifications</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div key={notification.id} 
                 className="bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-700/80 p-4 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                 style={{ animationDelay: `${index * 100}ms` }}>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">{notification.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{notification.message}</p>
              <p className="text-xs text-gray-400">{notification.date}</p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default NotificationsModal;