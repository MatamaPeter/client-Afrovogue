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
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">No new notifications</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{notification.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{notification.message}</p>
              <p className="text-xs text-gray-400 mt-1">{notification.date}</p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default NotificationsModal;