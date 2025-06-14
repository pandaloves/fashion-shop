import { useContext } from "react";
import { ShopContext } from "../components/context/ShopContext";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer } from "react-toastify";
import { UserContext } from "../components/context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { HStack } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";

const Cart = ({ products }) => {
  const {
    cartItems,
    removeFromCart,
    addToCart,
    clearCart,
    updateCartItemCount,
  } = useContext(ShopContext);

  const { totalAmount, handleOrder } = useContext(UserContext);

  const navigate = useNavigate();

  const productsInCart = products.filter(
    (product) => cartItems[product.productId] !== 0
  );

  return (
    <>
      <HStack className="mt-28 mb-3 ml-5">
        <Link to="/" size="xl">
          {/* The default icon size is 1em (16px) */}
          <ArrowLeftIcon boxSize={4} color="blue.500" className="mr-1" />
          Tillbaka
        </Link>
      </HStack>
      <div className="flex flex-col justify-center items-center mt-5 mb-24 mx-3 pt-2 pb-10 bg-gray-50">
        <div className="text-lg font-bold my-3">
          Dina kundvagnsartiklar
        </div>
        <div>
          {productsInCart.map((product) => (
            <div
              className="flex items-center my-6 px-2 pb-6 shadow-lg rounded-md transform hover:scale-105 hover:shadow-xl transition delay-50 duration-300 ease-in-out"
              key={uuidv4()}
            >
              <img
                className="w-20 h-36 md:w-28 md:h-40"
                src={product.productImage}
                alt={product.productName}
              />
              <div className="w-full text-xl ml-4">
                <p className="mb-1 font-bold text-base uppercase">
                  {product.productName}
                </p>
                <p className="text-pink-500 text-sm font-semibold">
                  {product.productPrice} SEK
                </p>

                <div>
                  <div className="my-1">
                    <button
                      className="text-2xl"
                      onClick={() => removeFromCart(product.productId)}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <input
                      className="w-8 text-center text-lg font-bold  text-pink-500"
                      value={cartItems[product.productId]}
                      onChange={(e) =>
                        updateCartItemCount(
                          parseInt(e.target.value),
                          product.productId
                        )
                      }
                    />
                    <button
                      className="text-2xl"
                      onClick={() => addToCart(product.productId)}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalAmount > 0 ? (
          <div className="mx my-3">
            <div className="flex flex-col justify-center items-center gap-2 my-5">
              <p className="font-bold text-center my-3">
                {" "}
                Delsumma: {totalAmount} SEK{" "}
              </p>
              <button
                className="w-36 h-12 bg-red-600 hover:bg-red-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                onClick={() => clearCart()}
              >
                {" "}
                Rensa vagnen{" "}
              </button>
            </div>

            <div className="flex justify-center items-center mt-8">
              <button
                className="w-40 h-12 bg-gray-400 hover:bg-black text-white uppercase border-none rounded-lg mx-2 cursor-pointer"
                onClick={() => navigate("/")}
              >
                {" "}
                Fortsätt handla{" "}
              </button>
              <button
                className="w-40 h-12 bg-pink-600  hover:bg-pink-700  text-white uppercase border-none rounded-lg mx-2 cursor-pointer "
                onClick={() => {
                  handleOrder();
                }}
              >
                {" "}
                Checkout{" "}
              </button>
            </div>
          </div>
        ) : (
          <h1> Din vagn är tom.</h1>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Cart;
