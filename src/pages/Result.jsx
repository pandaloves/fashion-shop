import {
  SimpleGrid,
  useDisclosure,
  Box,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import ToggleDraw from "../components/ToggleDraw";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ToastContainer } from "react-toastify";
import { ArrowLeftIcon } from "@chakra-ui/icons";

const Result = ({ products, results, details, handleProductDetails }) => {
  const { onOpen, onClose } = useDisclosure();
  const [openDrawers, setOpenDrawers] = useState([]);

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
      <HStack className="mt-28 mb-3 ml-5">
        <Link to="/" size="xl">
          {/* The default icon size is 1em (16px) */}
          <ArrowLeftIcon boxSize={4} color="blue.500" className="mr-1" />
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

      {results.length > 0 ? (
        <SimpleGrid
          columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
          padding="6px"
          mt={3}
          mb={28}
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
      ) : (
        <h1 className="text-base text-center mt-3 mb-28">
          Det finns inget sökresultat
        </h1>
      )}

      <ToastContainer />
    </>
  );
};

export default Result;
