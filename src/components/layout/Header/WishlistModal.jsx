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
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-red-100 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Heart size={28} className="text-red-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-xl mb-3 font-medium">Your wishlist is empty</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Save items you love for later</p>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map((item, index) => (
            <div key={item.id} 
                 className="flex items-center space-x-4 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-700/80 p-4 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                 style={{ animationDelay: `${index * 100}ms` }}>
              <div className="relative">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shadow-md" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white text-base truncate">{item.name}</h3>
                <p className="text-indigo-600 font-bold text-lg">${item.price}</p>
                <div className="flex items-center space-x-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"} 
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-2">({item.rating})</span>
                </div>
                <div className="mt-3">
                  <select
                    value={item.selectedSize || ''}
                    onChange={(e) => updateWishlistItemSize(item.id, e.target.value)}
                    className="block w-full rounded-xl border border-gray-300/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm shadow-sm"
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
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 whitespace-nowrap"
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