import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { FavoritesContext } from "../components/context/useFavorites";
import { ShopContext } from "./context/ShopContext";
import Price from "./Price";

const ProductCard = ({ products, handleClick }) => {
  const { addToCart, cartItems } = useContext(ShopContext);
  const { favorites, toggleFavorite, handleFavoriteStatusChange } =
    useContext(FavoritesContext);

  const onFavoriteStatusChange = handleFavoriteStatusChange;

  const handleToggleFavorite = (product) => {
    toggleFavorite(product);
    onFavoriteStatusChange(
      product.productName,
      !favorites.includes(product.productName)
    );
  };

  return (
    <>
      {products &&
        products.map((element) => (
          <div
            key={uuidv4()}
            className="relative flex flex-col items-center rounded-md w-52 h-80 px-4 py-5 m-4 transform hover:scale-105 hover:shadow-xl transition delay-50 duration-300 ease-in-out cursor-pointer shadow-lg shadow-slate-400"
          >
            <div className="flex flex-1 flex-col justify-center mb-4 relative">
              <div
                onClick={() => {
                  handleClick(element);
                }}
              >
                <img
                  src={element.productImage}
                  alt={element.productName}
                  className="rounded-lg mx-auto w-32 h-40"
                />
              </div>

              {/* Handle adding or removing favorites */}
              <div
                className="absolute top-1 right-1 cursor-pointer"
                onClick={() => handleToggleFavorite(element)}
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

            <div>
              <div onClick={() => handleClick(element)}>
                <p
                  className="font-semibold uppercase"
                  style={{ fontSize: "10px" }}
                >
                  {element.productName}
                </p>
              </div>

              <Price price={element.productPrice} />

              <div className="flex flex-row justify-center">
                <button
                  className="mx-2 my-4 bg-blue-400 hover:bg-blue-600 p-2  text-white uppercase rounded text-xs tracking-wider w-16 cursor-pointer"
                  onClick={() => {
                    handleClick(element);
                  }}
                >
                  View
                </button>

                <button
                  className="mx-2 my-4 bg-pink-600 hover:bg-pink-700 p-2 text-white uppercase rounded text-xs tracking-wider w-16 cursor-pointer"
                  onClick={() => addToCart(element.productId)}
                >
                  Add
                  {cartItems[element.productId] > 0 && (
                    <> ({cartItems[element.productId]})</>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ProductCard;
