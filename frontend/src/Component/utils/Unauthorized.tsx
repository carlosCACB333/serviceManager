import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router-dom";

const Unauthorized = ({ title }: { title?: string }) => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        401
      </Heading>
      <Flex justify="center" align="center" gap={3}>
        <Heading size="xl">
          <FiAlertTriangle />
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Acceso denegado
        </Text>
      </Flex>
      <Text color={"gray.500"} mb={6}>
        {title ||
          "El token no es correcto. Es posible que haya caducado o fue alterado. Vuelva a iniciar sesión por favor"}
      </Text>

      <Link to="/">
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
        >
          Recargar Página
        </Button>
      </Link>
    </Box>
  );
};

export default Unauthorized;
