import { Container, Flex, Image, Stack } from '@chakra-ui/react';
import Login from '../Component/auth/Login';
import { Card } from '../Component/utils/Card';

const AuthPage = () => {
  return (
    <Container
      as={Flex}
      maxW={'7xl'}
      minH="100vh"
      align="center"
      justifyContent="center"
      flexDir={{ base: 'column-reverse', md: 'row' }}
    >
      <Stack flex="3">
        <Image src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt="Fotito" />
      </Stack>
      <Stack flex="2" m={5}>
        <Card>
          <Login />
        </Card>
      </Stack>
    </Container>
  );
};

export default AuthPage;
