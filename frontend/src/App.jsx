import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { useColorModeValue } from "@/components/ui/color-mode";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        {/* <Route path="contact" element={<Contact />} /> */}
      </Routes>
    </Box>
  );
}

export default App;
