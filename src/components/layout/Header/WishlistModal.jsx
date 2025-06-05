import { Heart, Star, Plus } from "lucide-react";
import Modal from './Modal.jsx';


const WishlistModal = ({ 
  isOpen, 
  onClose, 
  wishlistItems, 
  updateWishlistItemSize,
  addToCart,
  cartItems,
  updateCartQuantity
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Saved Items${wishlistItems.length > 0 ? ` (${wishlistItems.length})` : ''}`}>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">Your wishlist is empty</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Save items you love for later</p>
        </div>
      ) : (
        <div className="space-y-3">
          {wishlistItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 sm:space-x-4 bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
              <img src={item.image} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg" />
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
                  if (!item.selectedSize) {
                    alert('Please select a size before adding to cart.');
                    return;
                  }
                  const existingItem = cartItems.find(cartItem => 
                    cartItem.id === item.id && cartItem.selectedSize === item.selectedSize
                  );
                  if (existingItem) {
                    updateCartQuantity(item.id, item.selectedSize, 1);
                  } else {
                    addToCart({ ...item, quantity: 1 });
                  }
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 touch-manipulation whitespace-nowrap"
              >
                <Plus size={16} className="inline mr-1" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default WishlistModal;