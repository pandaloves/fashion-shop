import { useContext, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../components/context/ShopContext";
import { UserContext } from "../components/context/UserContext";

const Header = () => {
  // State to manage the navbar's visibility
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalCartProducts } = useContext(ShopContext);
  const totalProducts = getTotalCartProducts();
  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const toggleAuthenticated = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <div className="bg-black flex justify-between items-center h-50 max-w-screen-2xl mx-auto px-4 py-3 text-white shadow-sm shadow-slate-100 z-50 fixed w-full top-0 left-0">
      {/* Name */}
      <h1 className="w-full text-xl font-bold text-[#00df9a]">FashionHub</h1>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-1">
        <NavLink
          className="p-4 hover:bg-[#00df9a] rounded-xl cursor-pointer duration-300 hover:text-black"
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className="p-4 hover:bg-[#00df9a] rounded-xl cursor-pointer duration-300 hover:text-black"
          to="/favorite"
        >
          Favorit
        </NavLink>

        <NavLink
          className="p-4 hover:bg-[#00df9a] rounded-xl cursor-pointer duration-300 hover:text-black"
          to="/contact"
        >
          Kontakt
        </NavLink>

        <div
          onClick={toggleAuthenticated}
          className="p-4 hover:bg-[#00df9a] rounded-xl cursor-pointer duration-300 hover:text-black"
        >
          {!isAuthenticated ? (
            <NavLink to="/login">Login</NavLink>
          ) : (
            <NavLink to="/logout">Logout</NavLink>
          )}
        </div>
      </div>

      <NavLink to="/cart">
        <GiShoppingCart className="w-7 h-7 my-auto mx-2.5 cursor-pointer" />
        <span className="absolute cursor-pointer top-1 right-9 md:top-4 md:right-5 lg:top-4 lg:right-5 text-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {totalProducts}
        </span>
      </NavLink>

      {/* Mobile Navigation Icon */}
      <div onClick={toggleOpen} className="block md:hidden cursor-pointer">
        {isOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={
          isOpen
            ? "fixed z-50 md:hidden right-0 top-10 w-[39%] h-48 border-r rounded-bl-xl border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Navigation Items */}
        <div className="hover:bg-[#00df9a] flex items-center justify-center py-2 mt-3 rounded-xl cursor-pointer duration-300 hover:text-black">
          <NavLink to="/">Hem</NavLink>
        </div>

        <div
          onClick={toggleAuthenticated}
          className="hover:bg-[#00df9a] flex items-center justify-center py-2 rounded-xl cursor-pointer duration-300 hover:text-black"
        >
          {!isAuthenticated ? (
            <NavLink to="/login">Login</NavLink>
          ) : (
            <NavLink to="/logout">Logout</NavLink>
          )}
        </div>

        <div className="hover:bg-[#00df9a] flex items-center justify-center py-2 rounded-xl cursor-pointer duration-300 hover:text-black">
          <NavLink to="/favorite">Favorit</NavLink>
        </div>
        <div className="hover:bg-[#00df9a] flex items-center justify-center py-2 rounded-xl cursor-pointer duration-300 hover:text-black">
          <NavLink to="/contact">Kontakt</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
