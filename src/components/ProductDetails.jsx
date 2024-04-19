import { useContext } from "react";
import { ShopContext } from "./context/ShopContext";
import products from "../products";
import { FavoritesContext } from "../components/context/useFavorites";

const ProductDetails = ({ element }) => {
  const { addToCart, cartItems, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  const { favorites, toggleFavorite, handleFavoriteStatusChange } =
    useContext(FavoritesContext);

  const product = products.find((p) => p.productId === element.productId);

  if (!product) {
    return null;
  }

  const cartItemAmount = cartItems[element.productId];

  const handleToggleFavorite = () => {
    toggleFavorite(element);
    handleFavoriteStatusChange(element.productName, !favorites.includes(element.prodcutName));
  };

  return (
    <div className="px-4">
      <div className="flex flex-col justify-center items-center px-4">
        <div className="flex items-center px-3 py-2 rounded-md relative">
          <img src={element.productImage} alt={element.productName} className="w-40 h-52" />

          {/* handle adding or removing favorites */}
          <div
            className="absolute top-3 right-4 cursor-pointer"
            onClick={handleToggleFavorite}
          >
            {/* Conditional rendering of heart icon based on favorite status */}
            {favorites.includes(element.productName) ? (
              <ion-icon
                name="heart"
                size="small"
                style={{ color: "red" }}
              ></ion-icon>
            ) : (
              <ion-icon
                name="heart-outline"
                size="small"
                style={{ color: "red" }}
              ></ion-icon>
            )}
          </div>
        </div>

        <div className="px-3 py-4 rounded-md">
          <h3 className="text-lg font-bold uppercase my-2 mx-2">
            {element.productName}
          </h3>

          <p className="text-red-500 text-base font-semibold my-2 mx-2">
            {element.productPrice} SEK
          </p>

          <p className="text-base my-2 mx-2">{element.productDescription}</p>

          <div className="my-2 mx-2">
            <button
              className="text-2xl"
              onClick={() => {
                cartItemAmount > 0 && removeFromCart(element.productId);
              }}
            >
              {" "}
              -{" "}
            </button>
            <input
              className="w-8 mx-2 text-center text-lg font-bold  text-red-500"
              value={cartItems[element.productId]}
              onChange={(e) => {
                updateCartItemCount(parseInt(e.target.value), element.productId);
              }}
            />
            <button
              className="text-2xl text-black-900"
              onClick={() => addToCart(element.productId)}
            >
              {" "}
              +{" "}
            </button>
          </div>

          <div className="d-flex justify-content-center">
            <button
              className="w-full h-12 m-2 bg-blue-600 text-white uppercase border-none rounded-lg cursor-pointer
              bg-transparent"
              onClick={() => addToCart(element.productId)}
            >
              Add To Cart
              {cartItemAmount > 0 && ` (${cartItemAmount})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
