import ProductCard from "../components/ProductCard";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer } from "react-toastify";
import ToggleDraw from "../components/ToggleDraw";
import { useState } from "react";
import { AbsoluteCenter, Box, Divider, useDisclosure } from "@chakra-ui/react";

const Home = ({ products, details, handleProductDetails }) => {
  const [openDrawers, setOpenDrawers] = useState([]);
  const { onOpen, onClose } = useDisclosure();

  // Handle click event on product card
  const handleClick = (element) => {
    setOpenDrawers([...openDrawers, element]);
    onOpen();
  };

  // Handle closing of drawer
  const handleCloseDrawer = () => {
    setOpenDrawers([]);
    onClose();
  };

  return (
    <>
      <div className="flex flex-wrap justify-center mt-24 mb-1 mx-3 pt-3 pb-10">
        {/* Poster */}
        <div className="flex justify-center items-center mx-3 p-2">
          <img
            src="/img/poster.jpg"
            className="rounded-md w-full h-auto md:w-3/4 lg:w-2/3 xl:w-1/2"
          />
        </div>
      </div>

      {/* Divider */}
      <Box position="relative" padding="10" marginTop="-5">
        <Divider />
        <AbsoluteCenter
          bg={"blue.400"}
          borderRadius="10px"
          px="2"
          py="2"
          fontSize="12px"
          color="white"
          _hover={{
            "&:hover": {
              bg: "blue.600",
            },
          }}
        >
          Produkter
        </AbsoluteCenter>
      </Box>

      <div className="flex flex-wrap justify-center xl:justify-start gap-3 mt-4 mb-20 mx-3 pt-3 pb-10">
        <ProductCard
          key={uuidv4()}
          products={products}
          handleClick={handleClick}
          handleProductDetails={handleProductDetails}
        />

        <ToggleDraw
          products={products}
          details={details}
          openDrawers={openDrawers}
          handleCloseDrawer={handleCloseDrawer}
        />
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
