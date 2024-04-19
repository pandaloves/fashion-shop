import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Define FavoritesContext outside of the useFavorites function
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (product) => {
    const index = favorites.findIndex(
      (favProduct) => favProduct === product.productName
    );
    if (index !== -1) {
      // If the product is already a favorite, remove it from favorites
      const newFavorites = [...favorites];
      newFavorites.splice(index, 1);
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      // If the product is not a favorite, add it to favorites
      setFavorites([...favorites, product.productName]);
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, product.productName])
      );
    }
  };

  const handleFavoriteStatusChange = (name, isFavorite) => {
    if (isFavorite) {
      toast.success(`${name} har sparats som favorit.`);
    } else {
      toast.error(`${name} har tagits bort från favorit.`);
    }
  };

  // Retrieve favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const contextValue = {
    favorites,
    toggleFavorite,
    handleFavoriteStatusChange,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
