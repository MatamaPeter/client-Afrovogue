import React, { createContext, useState, useEffect } from "react";

export const CartWishlistContext = createContext();

export const CartWishlistProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlistItems");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (product) => {
    setCartItems((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === product.id && item.selectedSize === product.selectedSize
      );
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...currentCart, { ...product }];
      }
    });
  };

  const removeFromCart = (productId, selectedSize) => {
    setCartItems((currentCart) => currentCart.filter((item) => !(item.id === productId && item.selectedSize === selectedSize)));
  };

  const updateCartQuantity = (productId, selectedSize, change) => {
    setCartItems((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId && item.selectedSize === selectedSize ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const addToWishlist = (product) => {
    setWishlistItems((currentWishlist) => {
      const exists = currentWishlist.find((item) => item.id === product.id);
      if (exists) return currentWishlist;
      return [...currentWishlist, product];
    });
  };

  const updateWishlistItemSize = (productId, selectedSize) => {
    setWishlistItems((currentWishlist) =>
      currentWishlist.map((item) =>
        item.id === productId ? { ...item, selectedSize } : item
      )
    );
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((currentWishlist) => currentWishlist.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartWishlistContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearCart,
        updateWishlistItemSize,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};
