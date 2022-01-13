import { Container, Flex, Image, Stack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Login from "../Component/auth/Login";
import Signup from "../Component/auth/Signup";
import { Card } from "../Component/utils/Card";

const AuthPage = () => {
  const path = useLocation().pathname;
  return (
    <Container
      as={Flex}
      maxW={"7xl"}
      minH="100vh"
      align="center"
      justifyContent="center"
      flexDir={{ base: "column-reverse", md: "row" }}
    >
      <Stack flex="3">
        <Image
          src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          alt="Segun Adebayo"
        />
      </Stack>
      <Stack flex="2" m={5}>
        <Card>{path === "/auth/login" ? <Login /> : <Signup />}</Card>
      </Stack>
    </Container>
  );
};

export default AuthPage;
