import ProductCard from "../components/ProductCard";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer } from "react-toastify";
import ToggleDraw from "../components/ToggleDraw";
import { useState } from "react";
import {
  AbsoluteCenter,
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

const Home = ({
  products,
  details,
  handleProductDetails,
  inputValue,
  setInputValue,
  inputRef,
  handleSubmit,
  alertOneRef,
  alertTwoRef,
}) => {
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
      <div className="flex flex-wrap justify-center mt-24 mb-2 mx-3 pt-3 pb-10">
        {/* Search form */}
        <form onSubmit={handleSubmit}>
          <FormControl textAlign={["center", "center", "left", "left"]}>
            <InputGroup>
              <Input
                ref={inputRef}
                type="text"
                placeholder="Ange en produkt t.ex. dress"
                size="md"
                mb={2}
                fontSize="12px"
                pl="2"
                style={{
                  border: "2px solid #00df9a",
                  width: "260px",
                }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <InputRightElement pointerEvents="none">
                <Search2Icon color="gray.600" marginLeft={-10} />
              </InputRightElement>
            </InputGroup>

            {/* Alert for empty input */}
            <Alert ref={alertOneRef} status="error" display="none">
              <AlertIcon />
              Inmatningsrutan kan inte lämnas tom.
            </Alert>

            {/* Alert for invalid input */}
            <Alert ref={alertTwoRef} status="error" display="none">
              <AlertIcon />
              Ange rätt namn på en produkt.
            </Alert>

            {/* Submit button */}
            <Button
              borderRadius="8px"
              colorScheme="green"
              variant="solid"
              py="6"
              px="16"
              my="5"
              mx="auto"
              lineHeight="1"
              size="md"
              type="submit"
            >
              Sök
            </Button>
          </FormControl>
        </form>
      </div>

      {/* Divider */}
      <Box position="relative" padding="10" margin="1">
        <Divider />
        <AbsoluteCenter
          bg={"green.400"}
          borderRadius="10px"
          px="2"
          py="2"
          fontSize="12px"
          color="white"
        >
          Populära Produkter
        </AbsoluteCenter>
      </Box>

      <div className="flex flex-wrap justify-center mt-4 mx-3 pt-3 pb-10">
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
