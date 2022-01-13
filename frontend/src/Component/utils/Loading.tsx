import { Flex, Box, HStack } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
const Loading = () => {
  return (
    <Flex h="100vh" gap="2">
      <Box
        bg={useColorModeValue("gray.100", "gray.800")}
        p={3}
        overflow="hidden"
      >
        <LoadingUser />
        <LoadingUser />
        <LoadingUser />
        <LoadingUser />
        <LoadingUser />
        <LoadingUser />
        <LoadingUser />
        <LoadingUser />
        <LoadingUser />
        <LoadingUser />
        <LoadingUser />
      </Box>

      <Box bg={useColorModeValue("gray.50", "gray.900")} flex={1}>
        <Flex align="center" justify="space-between">
          <Flex boxShadow="lg" align="center" my={2} p={2}>
            <SkeletonCircle size="10" me={2} />
            <SkeletonText mt="4" noOfLines={2} spacing="4" flex="1" />
          </Flex>

          <HStack>
            <Skeleton height="40px" w="50px" rounded="lg" />
            <Skeleton height="40px" w="50px" rounded="lg" />
          </HStack>
        </Flex>
      </Box>
    </Flex>
  );
};

const LoadingUser = () => {
  return (
    <Flex w={[100, 200, 300, 300]} align="center" boxShadow="lg" my={2} p={2}>
      <SkeletonCircle size="10" me={2} />
      <SkeletonText mt="4" noOfLines={3} spacing="4" flex="1" />
    </Flex>
  );
};
export default Loading;
