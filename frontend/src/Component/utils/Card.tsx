import { Box, useColorModeValue } from "@chakra-ui/react";

interface Props {
  children: JSX.Element | JSX.Element[] | boolean;
  [x: string]: any;
}

export const Card = ({ children, ...rest }: Props) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      p="10"
      rounded="2xl"
      boxShadow="md"
      {...rest}
    >
      {children}
    </Box>
  );
};
