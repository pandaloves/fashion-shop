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
import { UserContextProvider } from "./components/context/UserContext";
import { ShopContextProvider } from "./components/context/ShopContext";
import { ClipLoader } from "react-spinners"; 

function App() {
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://shop20250310222703.azurewebsites.net/api/Products"
        );
        if (!response.ok) throw new Error("Unable to fetch data");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductDetails = async (id) => {
    setIsLoadingDetails(true);
    try {
      const response = await fetch(
        `https://shop20250310222703.azurewebsites.net/api/Products/${id}`
      );
      if (!response.ok) throw new Error("Unable to fetch details");
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const keyword = inputRef.current.value.trim().toLowerCase();
    const filteredProducts = products.filter((p) =>
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
                      isLoadingDetails={isLoadingDetails}
                    />
                }
              />
              <Route
                path="result"
                element={
                  isLoading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px", marginTop: "10px" }}>
                      <ClipLoader color="#3498db" size={50} />
                    </div>
                  ) : (
                    <Result
                      products={products}
                      results={results}
                      details={details}
                      handleProductDetails={handleProductDetails}
                      isLoadingDetails={isLoadingDetails}
                    />
                  )
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="/cart" element={<Cart products={products} />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/favorite"
                element={
                  isLoading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
                      <ClipLoader color="#3498db" size={50} />
                    </div>
                  ) : (
                    <Favorite
                      products={products}
                      details={details}
                      handleProductDetails={handleProductDetails}
                      isLoadingDetails={isLoadingDetails}
                    />
                  )
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