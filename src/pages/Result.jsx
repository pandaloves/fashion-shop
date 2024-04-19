import {
  SimpleGrid,
  useDisclosure,
  Box,
  Heading,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import ToggleDraw from "../components/ToggleDraw";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ToastContainer } from "react-toastify";
import { ArrowLeftIcon } from "@chakra-ui/icons";

const Result = ({ products, results, details, handleProductDetails }) => {
  const { onOpen, onClose } = useDisclosure();
  const [openDrawers, setOpenDrawers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle browser back navigation
  useEffect(() => {
    const handleBrowserBackNavigation = () => {
      // Check if the previous location is the Dish page
      if (location.pathname === "/result") {
        // Navigate back to the Home page
        navigate("/", { replace: true });
      }
    };

    // Add an event listener for popstate event
    window.addEventListener("popstate", handleBrowserBackNavigation);

    return () => {
      // Remove the event listener when component unmounts
      window.removeEventListener("popstate", handleBrowserBackNavigation);
    };
  }, [location.pathname, navigate]);

  // Handle click on dish card
  const handleClick = (element) => {
    if (!openDrawers.includes(element)) {
      setOpenDrawers([...openDrawers, element]);
      onOpen();
    }
  };

  // Handle closing of drawer
  const handleCloseDrawer = () => {
    setOpenDrawers([]);
    onClose();
  };

  return (
    <>
      <HStack className="mt-20 mb-3 ml-3">
        <Link to="/" size="xl">
          {/* The default icon size is 1em (16px) */}
          <ArrowLeftIcon boxSize={4} color="green.500" className="mr-1" />
          Tillbaka
        </Link>
      </HStack>

      <Box mt={5} padding="5px">
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="#00df9a"
          textAlign="center"
        >
          Sökresultat
        </Heading>
      </Box>
      <SimpleGrid
        columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
        padding="6px"
        mt={3}
        mb={10}
        mx={6}
        spacing={5}
      >
        {/* Component to display dish cards */}
        <ProductCard
          products={results}
          handleClick={handleClick}
          handleProductDetails={handleProductDetails}
        />

        {/* Component for toggle the drawer */}
        <ToggleDraw
          products={products}
          details={details}
          openDrawers={openDrawers}
          handleCloseDrawer={handleCloseDrawer}
        />
      </SimpleGrid>
      <ToastContainer />
    </>
  );
};

export default Result;
