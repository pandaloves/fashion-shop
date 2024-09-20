import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Favorite from "./pages/Favorite";
import Checkout from "./pages/Checkout";
import { FavoritesProvider } from "./components/context/useFavorites";
import NotFound from "./pages/NotFound";
import { useNavigate } from "react-router-dom";
import Result from "./pages/Result";
import axios from "axios";
import { UserContextProvider } from "./components/context/UserContext";
import { ShopContextProvider } from "./components/context/ShopContext";

function App() {
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  // Handle fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://shop20240920093117.azurewebsites.net/api/Products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  // Fetch details of a product by its ID
  const handleProductDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://shop20240920093117.azurewebsites.net/api/Products/${id}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch details");
      }

      setDetails(response.data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  // Handle search products
  const handleSubmit = async (e) => {
    e.preventDefault();

    const keyword = inputRef.current.value.trim().toLowerCase();
    const filteredProducts = products.filter((p) =>
      p.productName.toLowerCase().includes(keyword)
    );

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
    <ShopContextProvider products={products}>
      <UserContextProvider>
        <FavoritesProvider>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  inputRef={inputRef}
                  handleSubmit={handleSubmit}
                />
              }
            >
              <Route
                exact
                path="/"
                element={
                  <Home
                    products={products}
                    details={details}
                    handleProductDetails={handleProductDetails}
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
