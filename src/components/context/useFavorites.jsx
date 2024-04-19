import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (product) => {
    const index = favorites.findIndex(
      (favProduct) => favProduct === product.productName
    );
    if (index !== -1) {
      const newFavorites = [...favorites];
      newFavorites.splice(index, 1);
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
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
