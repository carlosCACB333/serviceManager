import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Img,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaBuffer,
  FaClipboardList,
  FaDollarSign,
  FaPowerOff,
  FaRegMoon,
  FaSun,
  FaUserAlt,
  FaUserFriends,
} from "react-icons/fa";
import { FunctionComponent, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
// import calendar from "../assets/calendar.png";

const SideBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { authLogout } = useContext(AuthContext);

  const handleLogout = () => {
    authLogout();
  };
  return (
    <Flex
      borderRadius="2xl"
      shadow="lg"
      ms="2"
      py="5"
      my="auto"
      px="1"
      w="200px"
      h="98vh"
      className="scroll"
      flexDir="column"
      justify="space-between"
    >
      <Box>
        <HStack mb="20px" justifyContent="center">
          <Img
            src={require("../assets/calendar.png")}
            h="60px"
            borderRadius="15px"
          />
          <Text
            fontWeight="bold"
            ms="5"
            className="logo"
            textTransform="uppercase"
          >
            Servicios
          </Text>
        </HStack>
        <Divider my="3" />
        <Stack>
          <Text fontSize="small" ms="2">
            Dashboard
          </Text>
          <SideBarItem url="/" name="home" icon={FaBuffer} />
          <SideBarItem url="/profile" name="Perfil" icon={FaUserAlt} />
        </Stack>
        <Stack>
          <Text fontSize="small" ms="2">
            Servicios
          </Text>
          <SideBarItem
            url="/service/add"
            name="Registrar venta"
            icon={FaDollarSign}
          />
          <SideBarItem
            url="/service/list"
            name="Lista de ventas"
            icon={FaClipboardList}
          />
        </Stack>
        <Stack>
          <Text fontSize="small" ms="2">
            Clientes
          </Text>

          <SideBarItem url="/client" name="Clientes" icon={FaUserFriends} />
        </Stack>
      </Box>

      <HStack>
        <IconButton
          aria-label="Salir"
          icon={<FaPowerOff />}
          onClick={handleLogout}
        />
        <IconButton
          aria-label="tema"
          icon={colorMode === "dark" ? <FaSun /> : <FaRegMoon />}
          onClick={toggleColorMode}
        />
      </HStack>
    </Flex>
  );
};

export const SideBarItem = ({
  url,
  name,
  icon,
  onClick,
}: {
  url: string;
  name: string;
  icon: FunctionComponent;
  onClick?: () => void;
}) => {
  const loc = useLocation();
  const active = loc.pathname === url;

  return (
    <NavLink to={url} onClick={() => onClick && onClick()}>
      <Button
        w="100%"
        justifyContent="flex-start"
        _focus={{
          boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
        }}
        bg="transparent"
        m="0"
      >
        <Flex>
          <Flex
            rounded="xl"
            h="30px"
            w="30px"
            me="1"
            justifyContent="center"
            alignItems="center"
            color={active ? "blue.100" : "blue.500"}
            bg={active ? "blue.500" : "gray.200"}
          >
            <Icon as={icon}></Icon>
          </Flex>

          <Text my="auto" fontSize="sm">
            {name}
          </Text>
        </Flex>
      </Button>
    </NavLink>
  );
};

export default SideBar;
