import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FiAlertTriangle } from "react-icons/fi";

const Forbidden = ({ title }: { title?: string }) => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        403
      </Heading>
      <Flex justify="center" align="center" gap={3}>
        <Heading size="xl">
          <FiAlertTriangle />
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Prohibido
        </Text>
      </Flex>
      <Text color={"gray.500"} mb={6}>
        {title || "No tienes permiso para entrar a entrar Aquí"}
      </Text>
    </Box>
  );
};

export default Forbidden;
