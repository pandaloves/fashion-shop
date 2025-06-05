import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "./ShopContext";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [totalPay, setTotalPay] = useState("0");

  const { getTotalCartAmount, checkout } =
    useContext(ShopContext);

  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

      setIsAuthenticated(true);

      toast.success("Loggat in framgångsrikt！");
      setTimeout(() => {
        navigate("/");
      }, 1000);
  };

  // Handle order
  const handleOrder = () => {
      setOrderId(orderId);

      localStorage.setItem("orderId", orderId);
      console.log(orderId);

      const totalPay = totalAmount;
      setTotalPay(totalPay);

      localStorage.setItem("totalPay", totalPay);
      console.log(totalPay);

      toast.success("Beställningen lämnats lyckad!");

      setTimeout(() => {
        checkout();
        navigate("/checkout");
      }, 2000);
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
