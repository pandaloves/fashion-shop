import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import Details from "../pages/Details";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

const ToggleDraw = ({ products, openDrawers, handleCloseDrawer }) => {
  const [drawerStates, setDrawerStates] = useState({});

  // Update the local state when openDrawers prop changes
  useEffect(() => {
    const newDrawerStates = {};
    openDrawers.forEach((element) => {
      newDrawerStates[element.productId] = true;
    });
    setDrawerStates(newDrawerStates);
  }, [openDrawers]);

  // Handle closing a drawer
  const handleDrawerClose = (id) => {
    setDrawerStates((prevState) => ({
      ...prevState,
      [id]: false,
    }));
    handleCloseDrawer();
  };

  return (
    <>
      {/* Render each open drawer */}
      {openDrawers.map((element) => (
        <Drawer
          key={uuidv4()}
          onClose={() => handleDrawerClose(element.productId)}
          isOpen={drawerStates[element.productId]} 
          size={"xs"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton
              onClick={() => handleDrawerClose(element.productId)}
            />
            {/* Drawer header */}
            <DrawerHeader
              mt={10}
              fontSize={13}
              textAlign={"center"}
              color="#00df9a"
            >
              {`Detaljer om ${element.productName}`}
            </DrawerHeader>
            {/* Drawer body */}
            <DrawerBody mb={4}>
              <Details products={products} details={[element]} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ))}
    </>
  );
};

export default ToggleDraw;
