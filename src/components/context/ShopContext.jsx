import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ products, children }) => {
  const [cartItems, setCartItems] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [userId, setUserId] = useState(null);

  // Update initialCartItems whenever products change
  useEffect(() => {
    if (products.length > 0) {
      const initialCartItems = Object.fromEntries(
        products.map((product) => [product.productId, 0])
      );
      setCartItems(initialCartItems);
    }
  }, [products]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find(
          (product) => product.productId === Number(item)
        );
        totalAmount += cartItems[item] * itemInfo.productPrice;
      }
    }
    return totalAmount;
  };

  const getTotalCartProducts = () => {
    let totalProducts = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalProducts += cartItems[item];
      }
    }
    return totalProducts;
  };

  const addToCart = async (productId) => {
      setCartItems((prev) => ({ ...prev, [productId]: prev[productId] + 1 }));
      setCartCount((prevCount) => prevCount + 1);
  };

  const removeFromCart = async (productId) => {
      setCartItems((prev) => ({ ...prev, [productId]: prev[productId] - 1 }));
  };

  const resetCart = () => {
    const initialCartItems = Object.fromEntries(
      products.map((product) => [product.productId, 0])
    );
    setCartItems(initialCartItems);
    setCartCount(0);
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const clearCart = () => {
   

      const updatedCartItems = {};
      for (const productId in cartItems) {
        updatedCartItems[productId] = 0;
      }
      setCartItems(updatedCartItems);
  };

  const checkout = () => {
    const initialCartItems = Object.fromEntries(
      products.map((product) => [product.productId, 0])
    );
    setCartItems(initialCartItems);
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartProducts,
    clearCart,
    checkout,
    cartCount,
    resetCart,
    userId,
    setUserId,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
