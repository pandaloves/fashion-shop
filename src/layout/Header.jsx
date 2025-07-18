import { useContext, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../components/context/ShopContext";
import { UserContext } from "../components/context/UserContext";
import { toast } from "react-toastify";

import {
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
    <div className="bg-black flex justify-between items-center h-24 max-w-full pl-1 pr-5 py-3 text-white shadow-sm shadow-slate-600 z-50 fixed top-0 left-0 w-full">
      <img
        className="w-28 h-28 md:w-32 lg:w-52"
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
              size="lg"
              mr={3}
              pl="2"
              style={{
                border: "2px solid white",
                height: "31px",
                fontSize: "13px",
              }}
              className="w-full md:w-2/3 lg:w-1/2 md:text-sm lg:text-base"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
            <InputRightElement pointerEvents="none">
              <Search2Icon w={3} h={3} mt={-2} ml={-22} color="gray.400" />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>

      {/* Desktop navigation */}
      <div className="hidden md:flex space-x-1">
        <NavLink
          className="p-4 hover:bg-[white] rounded-xl cursor-pointer duration-300 hover:text-black"
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className="p-4 hover:bg-[white] rounded-xl cursor-pointer duration-300 hover:text-black"
          to="/favorite"
        >
          Favorit
        </NavLink>

        <NavLink
          className="p-4 hover:bg-[white] rounded-xl cursor-pointer duration-300 hover:text-black"
          to="/contact"
        >
          Kontakt
        </NavLink>

        <div className="hover:bg-[white] flex items-center justify-center p-4 rounded-xl cursor-pointer duration-300 hover:text-black">
          {!isAuthenticated ? (
            <NavLink to="/login">Login</NavLink>
          ) : (
            <div onClick={handleLogout}>Logout</div>
          )}
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="flex flex-row justify-between gap-2 mr-5">
        {/* Cart icon */}
        <NavLink to="/cart">
          <GiShoppingCart className="w-7 h-7 cursor-pointer" />
          <span className="absolute cursor-pointer top-6 mr-5 text-pink-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">
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
            ? "fixed z-50 md:hidden right-0 top-16 w-[39%] h-48 border-r rounded-bl-xl border-r-gray-900 bg-[#000300] ease-in-out duration-500"
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
