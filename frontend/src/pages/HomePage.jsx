import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={"9xl"}>
      <VStack spacing={8}>
        <Text
          fontSize={"xl"}
          fontWeight={"bold"}
          bg={useColorModeValue("gray.900", "gray.100")}
          bgClip={"text"}
          textAlign={"center"}
          mt={"20px"}
        >
          Current Products
        </Text>
        <SimpleGrid columns={[1, 2, 3]} gap="20px" w={"100%"}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            bgClip={"text"}
            textAlign={"center"}
            color={"gray.500"}
          >
            No Products Found.{" "}
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a new product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
