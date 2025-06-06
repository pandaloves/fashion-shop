import { useContext, useState } from "react";
import { FavoritesContext } from "../components/context/useFavorites";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer } from "react-toastify";
import ToggleDraw from "../components/ToggleDraw";
import { HStack, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@chakra-ui/icons";

const Favorite = ({ products, details, handleProductDetails }) => {
  const { favorites, toggleFavorite, handleFavoriteStatusChange } =
    useContext(FavoritesContext);

  const [openDrawers, setOpenDrawers] = useState([]);
  const { onOpen, onClose } = useDisclosure();

  const onFavoriteStatusChange = handleFavoriteStatusChange;

  const handleRemoveFavorite = (product) => {
    toggleFavorite(product);
    onFavoriteStatusChange(product.productName, false);
  };

  // Handle click event on product card
  const handleClick = (element) => {
    setOpenDrawers([...openDrawers, element]);
    onOpen();
  };

  // Handle closing of drawer
  const handleCloseDrawer = () => {
    setOpenDrawers([]);
    onClose();
  };

  return (
    <>
      <HStack className="mt-28 mb-3 ml-5">
        <Link to="/" size="xl">
          <ArrowLeftIcon boxSize={4} color="blue.600" className="mr-1" />
          Tillbaka
        </Link>
      </HStack>

      <div className="mt-5 mb-20 mx-1 pt-3 pb-10 px-1">
        <h1 className="mb-5 ml-6 text-lg font-bold text-center">
          Favorit
        </h1>

        {/* Mapping over favorite products */}
       {favorites.length === 0 ? (
  <div className="h2 text-center">Inga favorit!</div>
   ) : (
  favorites.map((favorite) => {
    const selectedProduct = products.find(
      (product) => product.productName === favorite
    );

    if (!selectedProduct) return null;

    return (
      <div
        key={uuidv4()}
        className="flex flex-row justify-between rounded-md mt-5 px-4 py-2 border-b-2 border-slate-100 mb-3 cursor-pointer"
      >
        <h3
          className="text-base"
          onClick={() => {
            handleClick(selectedProduct);
            handleProductDetails(selectedProduct.productId);
          }}
        >
          {favorite}
        </h3>

        <div className="flex justify-between">
          <button
            className="ml-1 mr-2 bg-gray-400 hover:bg-black px-2 py-2 text-white uppercase rounded text-xs tracking-wider cursor-pointer"
            onClick={() => {
              handleClick(selectedProduct);
              handleProductDetails(selectedProduct.productId);
            }}
          >
            View
          </button>

          <button
            className=" bg-pink-600 hover:bg-pink-700 px-2 py-2 text-white uppercase rounded text-xs tracking-wider cursor-pointer"
            onClick={() => {
              handleRemoveFavorite(selectedProduct);
            }}
          >
            Radera
          </button>
        </div>
      </div>
    );
  })
   )}

        <ToggleDraw
          products={products}
          details={details}
          openDrawers={openDrawers}
          handleCloseDrawer={handleCloseDrawer}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default Favorite;
