import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaClipboardList, FaUserEdit } from "react-icons/fa";

interface BacgroundProps {
  btnOption: number;
  setBtnOption: Dispatch<SetStateAction<number>>;
  name?: string;
  email?: string;
}

const BackgroundProfile = ({
  setBtnOption,
  btnOption,
  name = "",
  email = "",
}: BacgroundProps) => {
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  return (
    <Box mb="10px">
      <Box
        bgImage={"https://fondosmil.com/fondo/31355.jpg"}
        w="100%"
        h="300px"
        borderRadius="2xl"
        bgPosition="50%"
        bgRepeat="no-repeat"
        backgroundSize="cover"
      ></Box>
      <Flex
        direction={{ base: "column", md: "row" }}
        w="90%"
        justifyContent={{ sm: "center", md: "space-between" }}
        align="center"
        backdropFilter="saturate(200%) blur(60px)"
        boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
        border="2px solid"
        borderColor="blue.900"
        bg={bgProfile}
        p="15px"
        borderRadius="2xl"
        mt="-60px"
        mx="auto"
      >
        <Flex
          align="center"
          mb={{ sm: "10px", md: "0px" }}
          direction={{ base: "column", md: "row" }}
          w={{ sm: "100%" }}
          textAlign={{ sm: "center", md: "start" }}
        >
          <Avatar
            me={{ md: "22px" }}
            // src={logo}
            w="80px"
            h="80px"
            borderRadius="15px"
          />
          <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
            <Text
              fontSize={{ sm: "lg", lg: "xl" }}
              color={useColorModeValue("blue.700", "blue.300")}
              fontWeight="bold"
              ms={{ sm: "8px", md: "0px" }}
            >
              {name}
            </Text>
            <Text
              fontSize={{ sm: "sm", md: "md" }}
              color={"gray.400"}
              fontWeight="semibold"
            >
              {email}
            </Text>
          </Flex>
        </Flex>
        <Flex
          direction={{ base: "column", lg: "row" }}
          w={{ sm: "100%", md: "50%", lg: "auto" }}
        >
          <Button
            bg={btnOption === 1 ? "hsla(0,0%,100%,.3)" : "transparent"}
            borderRadius="15px"
            _focus={{ shadow: "none" }}
            onClick={() => {
              setBtnOption(1);
            }}
            _hover={{}}
          >
            <FaClipboardList />
            <Text fontSize="xs" fontWeight="bold" mx={2}>
              Lista de ventas
            </Text>
          </Button>
          <Button
            bg={btnOption === 2 ? "hsla(0,0%,100%,.3)" : "transparent"}
            borderRadius="15px"
            _focus={{ shadow: "none" }}
            onClick={() => {
              setBtnOption(2);
            }}
            _hover={{}}
          >
            <FaUserEdit />
            <Text fontSize="xs" fontWeight="bold" mx={2}>
              Actualizar datos
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default BackgroundProfile;
