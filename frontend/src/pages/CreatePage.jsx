import {
  Box,
  Button,
  Container,
  VStack,
  Heading,
  Input,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useState } from "react"; // import useState
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();
  // const toast = Toaster();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toaster.create({
        title: "Success",
        description: message,
        duration: 3000,
        isClosable: true,
        type: "success",
      });
      // reset the product state on success
      setProduct({
        name: "",
        price: "",
        image: "",
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
    <Container maxW={"3xl"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("gray.100", "gray.900")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={5}>
            <Input
              type="text"
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              autoComplete="on"
              onChange={
                (e) => setProduct({ ...newProduct, name: e.target.value }) // update the product state
              }
            />
            <Input
              type="number"
              placeholder="Product Price"
              name="price"
              value={newProduct.price}
              onChange={
                (e) => setProduct({ ...newProduct, price: e.target.value }) // update the product state
              }
            />
            <Input
              type="text"
              mb={5}
              placeholder="Product Image URL"
              name="image"
              value={newProduct.image}
              onChange={
                (e) => setProduct({ ...newProduct, image: e.target.value }) // update the product state
              }
            />
            <Button
              bg={"gray.100"}
              _hover={{ bg: "blue.500" }}
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
