import { useContext } from "react";
import { ShopContext } from "../../components/context/ShopContext";

export const CartItem = ({ id, name, price, image }) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    clearCart,
  } = useContext(ShopContext);

  return (
    <div className="flex items-center my-6 px-2 pb-6 shadow-lg rounded-md transform hover:scale-105 hover:shadow-xl transition delay-50 duration-300 ease-in-out">
      <img className="w-20 h-36 md:w-28 md:h-40" src={image} alt={name} />
      <div className="w-full text-xl ml-4">
        <p className="mb-1 font-bold text-base uppercase">{name}</p>
        <p className="text-red-500 text-sm font-semibold">{price} SEK</p>

        <div>
          <div className="my-1">
            <button className="text-2xl" onClick={() => removeFromCart(id)}>
              {" "}
              -{" "}
            </button>
            <input
              className="w-8 text-center text-lg font-bold  text-red-500"
              value={cartItems[id]}
              onChange={(e) =>
                updateCartItemCount(parseInt(e.target.value), id)
              }
            />
            <button className="text-2xl" onClick={() => addToCart(id)}>
              {" "}
              +{" "}
            </button>
          </div>

          <button
            className="ml-8 bg-red-600 hover:bg-red-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            onClick={() => clearCart()}
          >
            {" "}
            Rensa vagnen{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
