import {
  Avatar,
  Badge,
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaRemoveFormat } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { startDeleteUser, startUserSetActive } from "../../actions/userAction";
import { UserInterface } from "../../interfaces/userInterfaces";
import Confirm from "../utils/Confirm";
import { useColorModeValue } from "@chakra-ui/react";

interface Props {
  users: UserInterface[];
}

const UserTable = ({ users }: Props) => {
  return (
    <>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Cuenta</Th>
            <Th>Nombre</Th>
            <Th>Apellido</Th>
            <Th>Correo</Th>
            <Th>Estado</Th>

            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <TableItem user={user} key={user.id} />
          ))}
        </Tbody>
      </Table>
    </>
  );
};

const TableItem = ({ user }: { user: UserInterface }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSelect = (id: number) => {
    dispatch({ type: "userOnSelected", payload: id });
  };
  return (
    <Tr
      cursor="pointer"
      onClick={() => handleSelect(user.id)}
      _hover={{ backgroundColor: useColorModeValue("gray.100", "gray.700") }}
    >
      <Td>
        <Flex align="center">
          <Avatar name={user.first_name + " " + user.last_name} />
          <Box>
            <Text ms={2} fontWeight="bold">
              {user.username}
            </Text>
            <Badge colorScheme="green" mx={2} rounded="full" fontSize={10}>
              {user.rol}
            </Badge>
          </Box>
        </Flex>
      </Td>
      <Td>{user.first_name}</Td>
      <Td>{user.last_name}</Td>
      <Td>{user.email}</Td>
      <Td onClick={(e) => e.stopPropagation()}>
        <Switch
          isChecked={user.is_active}
          checked={user.is_active}
          onChange={() => dispatch(startUserSetActive(user.id))}
        />
      </Td>
      <Td onClick={(e) => e.stopPropagation()}>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<BsThreeDotsVertical />}
            variant="ghost"
          ></MenuButton>
          <MenuList>
            <MenuItem icon={<FaEdit />} onClick={() => handleSelect(user.id)}>
              Editar
            </MenuItem>

            <Confirm
              onClick={() => dispatch(startDeleteUser(user.id, toast))}
              type="menuItem"
              title="Eliminar"
              desc="Esta acción es irreversible.¿Deseas eliminar el usuario?"
              icon={<FaRemoveFormat />}
            ></Confirm>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
};

export default UserTable;
