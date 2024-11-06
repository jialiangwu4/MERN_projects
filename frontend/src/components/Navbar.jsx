import { Container, Flex, Text, HStack, Button } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"100%"} px={"2%"}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", md: "row", sm: "row" }}
      >
        <Text
          fontSize={{ base: "2xl", md: "3xl", sm: "3xl" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          color={"white.300"}
        >
          <Link to={"/"}>Home</Link>
        </Text>
        <HStack spacing={8} alignItems={"center"}>
          <Link to={"/create"}>
            <Button
              bg={useColorModeValue("gray.900", "gray.100")}
              _hover={{ bg: "blue.500" }}
            >
              <FaPlus fontSize={"10px"} />
            </Button>
          </Link>
          <Button
            onClick={toggleColorMode}
            bg={useColorModeValue("gray.900", "gray.100")}
          >
            {colorMode === "light" ? (
              <IoMoon fontSize={"10px"} />
            ) : (
              <LuSun fontSize={"10px"} />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
