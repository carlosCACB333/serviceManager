import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons/lib";

interface Options {
  name: string;
  value: number;
  icon: IconType;
}

interface BacgroundProps {
  btnOption: number;
  setBtnOption: Dispatch<SetStateAction<number>>;
  name?: string;
  email?: string;
  options: Options[];
}

const BackgroundProfile = ({
  setBtnOption,
  btnOption,
  name = "",
  email = "",
  options,
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
            name={name}
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
          {options.map((op) => (
            <Button
              key={op.value}
              bg={btnOption === op.value ? "hsla(0,0%,100%,.3)" : "transparent"}
              borderRadius="15px"
              _focus={{ shadow: "none" }}
              onClick={() => {
                setBtnOption(op.value);
              }}
              _hover={{}}
            >
              <op.icon />
              <Text fontSize="xs" fontWeight="bold" mx={2}>
                {op.name}
              </Text>
            </Button>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default BackgroundProfile;
