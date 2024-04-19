import { useContext } from "react";
import { FavoritesContext } from "../components/context/useFavorites";
import { ShopContext } from "./context/ShopContext";
import Price from "./Price";

const ProductCard = ({ products, handleClick }) => {
  const { addToCart, cartItems } = useContext(ShopContext);
  const { favorites, toggleFavorite, handleFavoriteStatusChange } =
    useContext(FavoritesContext);

  const onFavoriteStatusChange = handleFavoriteStatusChange;

  const handleToggleFavorite = (product) => {
    toggleFavorite(product); // Pass the entire product object
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
            key={element.productId}
            className="relative flex flex-col items-center rounded-md mb-6 mr-6 px-4 py-6 transform hover:scale-105 hover:shadow-xl transition delay-50 duration-300 ease-in-out cursor-pointer"
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

              {/* handle adding or removing favorites */}
              <div
                className="absolute top-0 right-1 cursor-pointer"
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
                <p className="text-base font-bold uppercase">
                  {element.productName}
                </p>
              </div>

              <Price price={element.productPrice} />

              <button
                className="mt-4 ml-1 mr-2 bg-[#00df9a]  hover:bg-[#00df9a] px-1 py-2 text-white uppercase rounded text-xs tracking-wider w-16 cursor-pointer"
                onClick={() => {
                  handleClick(element);
                }}
              >
                View
              </button>

              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-1 py-2 text-white uppercase rounded text-xs tracking-wider w-28 cursor-pointer"
                onClick={() => addToCart(element.productId)}
              >
                Add
                {cartItems[element.productId] > 0 && (
                  <> ({cartItems[element.productId]})</>
                )}
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default ProductCard;
