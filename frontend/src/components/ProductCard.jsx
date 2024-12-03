/* eslint-disable react/prop-types */
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  Button,
  VStack,
  Input,
} from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogActionTrigger,
} from "@/components/ui/dialog";
import { useColorModeValue } from "@/components/ui/color-mode";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useProductStore } from "../store/product";
import { toaster } from "@/components/ui/toaster";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const bgColor = useColorModeValue("white", "gray.800");
  const [open, setOpen] = useState(false); // state to control the dialog window
  const [currentProduct, setCurrentProduct] = useState(product);

  const { deleteProduct } = useProductStore();
  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (success) {
      toaster.create({
        title: "Success",
        description: message,
        duration: 3000,
        isClosable: true,
        type: "success",
      });
    } else {
      toaster.create({
        title: "Error",
        description: message,
        duration: 3000,
        isClosable: true,
        type: "error",
      });
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bgColor}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={200}
        w="full"
        objectFit={"cover"}
      ></Image>

      <Box p={4}>
        <Heading as="h3" size={"md"} mb={2} color={textColor}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            aria-label="Edit"
            colorPalette={"cyan"}
            onClick={() => setOpen(true)}
          >
            <CiEdit />{" "}
          </IconButton>
          <IconButton
            aria-label="Delete"
            colorPalette={"pink"}
            onClick={() => handleDeleteProduct(product._id)}
          >
            <MdDeleteForever />
          </IconButton>
        </HStack>
      </Box>

      {/* Chakra UI Dialo (aka. Modal)  */}
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack>
              <Input
                placeholder="Product Name"
                name="name"
                value={currentProduct.name}
              />
              <Input
                placeholder="Product Price"
                name="price"
                type="number"
                value={currentProduct.price}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={currentProduct.image}
              />
            </VStack>
          </DialogBody>
          <DialogFooter>
            <Button colorPalette="teal" mr={3}>
              Update
            </Button>
            <DialogActionTrigger asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default ProductCard;
