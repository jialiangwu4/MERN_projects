import {
  Box,
  Button,
  Container,
  VStack,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useState } from "react"; // import useState

const CreatePage = () => {
  const [newProduct, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

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
              onChange={(e) => {
                setProduct({ ...newProduct, name: e.target.value });
              }}
            />
            <Input
              type="number"
              placeholder="Product Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              type="text"
              mb={5}
              placeholder="Product Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button bg={"gray.100"} _hover={{ bg: "blue.500" }}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
