import { createContext, useEffect, useState } from "react";
import axios from "axios";
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
    if (userId === null) {
      toast.warning("Vänligen logga in först!");
      return;
    }
    try {
      const myObj = {
        userId: userId,
        cartItems: [
          {
            productId: productId,
            productQuantity: 1,
          },
        ],
      };
      const response = await axios.post(
        "https://shop20240920093117.azurewebsites.net/api/Cart/add-to-cart",
        {
          body: JSON.stringify(myObj),
        }
      );

      if (!response.ok) {
        throw new Error("Kan inte lägga till produkten!");
      }

      setCartItems((prev) => ({ ...prev, [productId]: prev[productId] + 1 }));
      setCartCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Fel när varan lades till i kundvagnen:", error);
    }
  };

  const removeFromCart = async (productId) => {
    const myObj = {
      userId: userId,
      productId: productId,
    };
    try {
      const response = await axios.post(
        `https://shop20240920093117.azurewebsites.net/api/Cart/decrement-cart-item/${userId}/${productId}`,
        {
          body: JSON.stringify(myObj),
        }
      );

      if (!response.ok) {
        throw new Error("Kan inte radera produkten!");
      }

      setCartItems((prev) => ({ ...prev, [productId]: prev[productId] - 1 }));
    } catch (error) {
      console.error("Fel när varan raderas i kundvagnen:", error);
    }
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

  const clearCart = async () => {
    try {
      const response = await axios.delete(
        `https://shop20240920093117.azurewebsites.net/api/Cart/delete-cart/${userId}`
      );
      if (!response.ok) {
        throw new Error("Kan inte rensa kundvagnen!");
      }

      const updatedCartItems = {};
      for (const productId in cartItems) {
        updatedCartItems[productId] = 0;
      }
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Fel när man inte få rensa kundvagnen:", error);
    }
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
