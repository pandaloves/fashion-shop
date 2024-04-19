import { useContext } from "react";
import { ShopContext } from "../components/context/ShopContext";
import { FavoritesContext } from "../components/context/useFavorites";

const Details = ({ products, details }) => {
  const { addToCart, cartItems, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  const { favorites, toggleFavorite, handleFavoriteStatusChange } =
    useContext(FavoritesContext);

  return (
    <>
      <section className="pt-3">
        {details &&
          details.map((element) => {
            const product = products.find(
              (p) => p.productId === element.productId
            );

            if (!product) {
              return null;
            }

            const cartItemAmount = cartItems[element.productId];

            const handleToggleFavorite = () => {
              toggleFavorite(element);
              handleFavoriteStatusChange(
                element.productName,
                !favorites.includes(element.productName)
              );
            };

            return (
              <div className="rounded-md px-4" key={element.productId}>
                <div className="flex flex-col justify-center items-center">
                  <div className="flex items-center px-3 py-2 shadow-lg rounded-md relative">
                    <img
                      src={element.productImage}
                      alt={element.productName}
                      className="w-40 h-52"
                    />

                    <div
                      className="absolute top-3 right-4 cursor-pointer"
                      onClick={handleToggleFavorite}
                    >
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
                    <h3 className="text-base font-semibold uppercase my-2 mx-2 text-black">
                      {element.productName}
                    </h3>

                    <p className="text-red-500 text-base font-semibold my-2 mx-2">
                      {element.productPrice} SEK
                    </p>

                    <p className="text-base text-black my-2 mx-2">
                      {element.productDescription}
                    </p>

                    <div className="my-2 mx-2">
                      <button
                        className="text-2xl text-black"
                        onClick={() => {
                          cartItemAmount > 0 &&
                            removeFromCart(element.productId);
                        }}
                      >
                        {" "}
                        -{" "}
                      </button>
                      <input
                        className="w-8 mx-1 text-center text-lg font-bold  text-red-500"
                        value={cartItems[element.productId]}
                        onChange={(e) => {
                          updateCartItemCount(
                            parseInt(e.target.value),
                            element.productId
                          );
                        }}
                      />
                      <button
                        className="text-2xl"
                        onClick={() => addToCart(element.productId)}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        className="w-48 h-12 m-2 bg-blue-600 text-white uppercase border-none rounded-lg cursor-pointer"
                        onClick={() => addToCart(element.productId)}
                      >
                        Lägg till i kundvagn
                        {cartItemAmount > 0 && ` (${cartItemAmount})`}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </section>
    </>
  );
};

export default Details;
