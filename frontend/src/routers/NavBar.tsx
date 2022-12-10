import { Flex, HStack } from '@chakra-ui/layout';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useContext } from 'react';
import { FaBars, FaPowerOff, FaSun, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>;
}

const NavBar = ({ setShow }: Props) => {
  const {
    auth: { user },
    authLogout,
  } = useContext(AuthContext);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      px={4}
      //   bg={useColorModeValue(
      //     "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
      //     "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
      //   )}
      borderRadius="2xl"
      w="full"
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack>
          <IconButton aria-label="menu" icon={<FaBars />} size="sm" onClick={() => setShow((state) => !state)} />
          <Box textOverflow="ellipsis" noOfLines={1} fontWeight="extrabold">
            {user.first_name + ' ' + user.last_name}
            <Badge colorScheme="green" mx={2} rounded="full">
              {user.rol}
            </Badge>
          </Box>
        </HStack>

        <Flex alignItems={'center'}>
          <Menu autoSelect={false}>
            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
              <Avatar size={'sm'} name={user.first_name + ' ' + user.last_name} />
            </MenuButton>
            <MenuList p={3}>
              <Center flexDirection="column">
                <Avatar size="xl" name={user.first_name + ' ' + user.last_name}></Avatar>
                <Text fontWeight="bold" my="3">
                  ¡Hola!. {user.first_name + ' ' + user.last_name}
                </Text>
                <Badge colorScheme="green" mx={2} rounded="full">
                  {user.rol}
                </Badge>
              </Center>

              <Link to={'/profile'}>
                <MenuItem icon={<FaUser />}>Perfil</MenuItem>
              </Link>

              <FormControl display="flex" alignItems="center" ms={3}>
                <FaSun />
                <FormLabel htmlFor="email-alerts" mb="0" mx={2}>
                  Modo Oscuro
                </FormLabel>
                <Switch isChecked={colorMode === 'dark'} onChange={() => toggleColorMode()} />
              </FormControl>

              <MenuItem icon={<FaPowerOff />} onClick={() => authLogout()}>
                Cerrar cesión
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
