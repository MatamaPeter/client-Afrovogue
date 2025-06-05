import { ShoppingBag, X, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Modal from './Modal.jsx';

const CartModal = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  removeFromCart, 
  updateCartQuantity,
  getTotalPrice,
  getTotalItems
}) => {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Your Cart${getTotalItems() > 0 ? ` (${getTotalItems()})` : ''}`}>
      {cartItems.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">Your cart is empty</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Discover our latest collections</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex items-center space-x-3 sm:space-x-4 bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                <img src={item.image} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg" />
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
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-1 sm:px-2 text-gray-900 dark:text-white font-medium min-w-[20px] text-center text-sm sm:text-base">{item.quantity}</span>
                  <button 
                    onClick={() => updateCartQuantity(item.id, item.selectedSize, 1)}
                    className="text-gray-500 hover:text-indigo-600 transition-colors p-1 touch-manipulation"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id, item.selectedSize)}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-2 rounded-lg touch-manipulation"
                  title="Remove from Cart"
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
                onClose();
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
  );
};

export default CartModal;