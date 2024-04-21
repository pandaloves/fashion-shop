import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < 22; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = ({ products, children }) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [cartCount, setCartCount] = useState(0);
  const [userId, setUserId] = useState(null);

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
      const response = await fetch(
        "https://localhost:7140/api/Cart/add-to-cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
      const response = await fetch(
        `https://localhost:7140/api/Cart/decrement-cart-item/${userId}/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
    setCartItems(getDefaultCart());
    setCartCount(0);
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const clearCart = async () => {
    try {
      const response = await fetch(
        `https://localhost:7140/api/Cart/delete-cart/${userId}`,
        {
          method: "DELETE",
        }
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
    setCartItems(getDefaultCart());
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
