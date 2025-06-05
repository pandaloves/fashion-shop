import React, { useRef, useState } from "react";
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
import { products as productsData } from "./assets/products";
import Result from "./pages/Result";
import { UserContextProvider } from "./components/context/UserContext";
import { ShopContextProvider } from "./components/context/ShopContext";
import { ClipLoader } from "react-spinners"; 

function App() {
  const [details, setDetails] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  const handleProductDetails = (id) => {
    setIsLoadingDetails(true);
    try {
      const product = productsData.find((p) => p.ProductId === id);
      if (!product) throw new Error("Product not found");
      setDetails(product);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const keyword = inputRef.current.value.trim().toLowerCase();
    const filteredProducts = productsData.filter((p) =>
      p.productName.toLowerCase().includes(keyword)
    );
    setResults(filteredProducts);
    setInputValue("");
    navigate("/result", { replace: true, state: { results: filteredProducts } });
  };

  function ScrollToTop() {
    const { pathname } = useLocation();
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  }

  return (
    <ShopContextProvider products={productsData}>
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
                      products={productsData}
                      details={details}
                      handleProductDetails={handleProductDetails}
                    />
                }
              />
              <Route
                path="result"
                element={
                    <Result
                      products={productsData}
                      results={results}
                      details={details}
                      handleProductDetails={handleProductDetails}
                    />
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="/cart" element={<Cart products={productsData} />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/favorite"
                element={
                    <Favorite
                      products={productsData}
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