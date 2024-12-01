/* eslint-disable react/prop-types */
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useProductStore } from "../store/product";
import { toaster } from "@/components/ui/toaster";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const bgColor = useColorModeValue("white", "gray.800");

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
          <IconButton aria-label="Edit" colorPalette={"cyan"}>
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
    </Box>
  );
};

export default ProductCard;
