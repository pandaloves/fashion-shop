import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cart from "./pages/cart/Cart";
import Contact from "./pages/Contact";
import Favorite from "./pages/Favorite";
import Checkout from "./pages/Checkout";
import { FavoritesProvider } from "./components/context/useFavorites";
import NotFound from "./pages/NotFound";
import { useNavigate } from "react-router-dom";
import Result from "./pages/Result";
import { UserContextProvider } from "./components/context/UserContext";
import { ShopContextProvider } from "./components/context/ShopContext";

function App() {
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const alertOneRef = useRef();
  const alertTwoRef = useRef();

  // Handle fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://localhost:7140/api/Products");

      if (!response.ok) {
        throw new Error("Unable to fetch data");
      }

      const data = await response.json();

      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Fetch details of a dish by its ID
  const handleProductDetails = async (id) => {
    try {
      const response = await fetch(`https://localhost:7140/api/Products/${id}`);

      if (!response.ok) {
        throw new Error("Unable to fetch details");
      }

      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const keyword = inputRef.current.value.trim().toLowerCase();
    const filteredProducts = products.filter((p) =>
      p.productName.toLowerCase().includes(keyword)
    );

    if (keyword === "") {
      alertOneRef.current.style.display = "block";
      alertTwoRef.current.style.display = "none";
      return;
    }

    if (filteredProducts.length === 0) {
      alertOneRef.current.style.display = "none";
      alertTwoRef.current.style.display = "block";
      return;
    }

    setResults(filteredProducts);
    setInputValue("");

    navigate("/result", {
      replace: true,
      state: { results: filteredProducts },
    });
  };

  function ScrollToTop() {
    const { pathname } = useLocation();

    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <ShopContextProvider>
      <UserContextProvider>
        <FavoritesProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                exact
                path="/"
                element={
                  <Home
                    products={products}
                    details={details}
                    handleProductDetails={handleProductDetails}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    inputRef={inputRef}
                    handleSubmit={handleSubmit}
                    alertOneRef={alertOneRef}
                    alertTwoRef={alertTwoRef}
                  />
                }
              />
              <Route
                path="result"
                element={
                  <Result
                    products={products}
                    results={results}
                    details={details}
                    handleProductDetails={handleProductDetails}
                  />
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
              <Route path="register" element={<Register />} />
              <Route path="/cart" element={<Cart products={products} />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/favorite"
                element={
                  <Favorite
                    products={products}
                    details={details}
                    handleProductDetails={handleProductDetails}
                  />
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </FavoritesProvider>
      </UserContextProvider>
    </ShopContextProvider>
  );
}

export default App;
