import { useContext, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../components/context/ShopContext";
import { UserContext } from "../components/context/UserContext";
import { toast } from "react-toastify";

import {
  Alert,
  AlertIcon,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

const Header = ({ inputValue, setInputValue, inputRef, handleSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalCartProducts } = useContext(ShopContext);
  const totalProducts = getTotalCartProducts();
  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.error("Logga ut framgångsrikt");
    navigate("/");
  };

  return (
    <div className="bg-black flex justify-between items-center h-50 max-w-screen-2xl pl-1 pr-5 py-3 text-white shadow-sm shadow-slate-600 z-50 w-screen fixed h-16 top-0 left-0">
      <img
        className="w-24 h-20 md:w-32 lg:w-40"
        src="/img/logo.png"
        alt="logo"
      />

      {/* Search form */}
      <form onSubmit={handleSubmit}>
        <FormControl
          textAlign={["center", "center", "left", "left"]}
          className="flex flex-col justify-center"
        >
          <InputGroup>
            <Input
              ref={inputRef}
              type="text"
              placeholder="Sök t.ex. dress"
              size="md"
              mr={3}
              fontSize="9px"
              pl="2"
              style={{
                border: "2px solid #00df9a",
                width: "80%",
                height: "29px",
              }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
            <InputRightElement pointerEvents="none">
              <Search2Icon w={2} h={2} mt={-2} ml={-20} color="gray.400" />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>

      {/* Desktop navigation */}
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

        <div className="hover:bg-[#00df9a] flex items-center justify-center p-4 rounded-xl cursor-pointer duration-300 hover:text-black">
          {!isAuthenticated ? (
            <NavLink to="/login">Login</NavLink>
          ) : (
            <div onClick={handleLogout}>Logout</div>
          )}
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="flex flex-row justify-between gap-2">
        {/* Cart icon */}
        <NavLink to="/cart">
          <GiShoppingCart className="w-7 h-7 cursor-pointer" />
          <span className="absolute cursor-pointer top-2 right-11 md:right-4 lg:right-5 text-pink-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {totalProducts}
          </span>
        </NavLink>

        {/* Mobile menu toggle */}
        <div
          onClick={toggleOpen}
          className="block md:hidden cursor-pointer mt-1"
        >
          {isOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
      </div>
      <div
        className={
          isOpen
            ? "fixed z-50 md:hidden right-0 top-14 w-[39%] h-48 border-r rounded-bl-xl border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        <div className="hover:bg-[#00df9a] flex items-center justify-center py-2 mt-3 rounded-xl cursor-pointer duration-300 hover:text-black">
          <NavLink to="/">Hem</NavLink>
        </div>

        <div className="hover:bg-[#00df9a] flex items-center justify-center py-2 rounded-xl cursor-pointer duration-300 hover:text-black">
          {!isAuthenticated ? (
            <NavLink to="/login">Login</NavLink>
          ) : (
            <div onClick={handleLogout}>Logout</div>
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
