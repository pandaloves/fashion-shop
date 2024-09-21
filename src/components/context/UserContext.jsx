import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ShopContext } from "./ShopContext";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [totalPay, setTotalPay] = useState("0");

  const { userId, setUserId, cartItems, getTotalCartAmount, checkout } =
    useContext(ShopContext);

  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    const myObj = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://shop20240920093117.azurewebsites.net/api/ShopUsers/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(myObj),
        }
      );

      if (!response.ok) {
        throw new Error("Kan inte logga in");
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      console.log(token);

      // Decode the JWT token to access claims
      const decodedToken = jwtDecode(token);

      // Extract the user ID from the claim
      let userId = null;
      const userClaims =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ];

      if (userClaims && userClaims.length >= 3) {
        userId = parseInt(userClaims[2], 10);
        setUserId(userId);
        localStorage.setItem("userId", userId);
        console.log(userId);
      } else {
        console.error("User claims are missing or incomplete.");
      }
      setIsAuthenticated(true);

      toast.success("Loggat in framgångsrikt！");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(
        "Loggat misslyckades. Kontrollera din e-postadress och ditt lösenord."
      );
      console.error("Fel vid inloggning:", error);
    }
  };

  // Handle order
  const handleOrder = async () => {
    if (userId === null) {
      toast.warning("Vänligen logga in först!");
      return;
    }

    try {
      const orderItems = Object.keys(cartItems).map((productId) => ({
        productId: parseInt(productId),
        productQuantity: parseInt(cartItems[productId]),
      }));

      const order = {
        userId: userId,
        orderItems: orderItems,
        totalAmount: totalAmount,
      };

      const response = await fetch(
        "https://shop20240920093117.azurewebsites.net/api/Orders/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

      if (!response.ok) {
        throw new Error("Det gick inte att beställa!");
      }

      const data = await response.json();
      console.log(data);

      const orderId = data.orderId;
      setOrderId(orderId);

      localStorage.setItem("orderId", orderId);
      console.log(orderId);

      const totalPay = data.totalAmount;
      setTotalPay(totalPay);

      localStorage.setItem("totalPay", totalPay);
      console.log(totalPay);

      toast.success("Beställningen lämnats lyckad!");

      setTimeout(() => {
        checkout();
        navigate("/checkout");
      }, 2000);
    } catch (error) {
      toast.error("Det gick inte att skicka beställning. Var god försök igen.");
      console.error("Fel vid beställning:", error);
    }
  };

  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,

    isAuthenticated,
    setIsAuthenticated,
    handleLogin,
    totalAmount,
    handleOrder,
    orderId,
    totalPay,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
