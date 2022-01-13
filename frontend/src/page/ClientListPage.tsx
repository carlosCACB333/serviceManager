import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Card } from "../Component/utils/Card";
import { useEffect, useState } from "react";
import { getClientsAllApi } from "../helpers/api";
import { Link } from "react-router-dom";
import { ClientInterface } from "../interfaces/serviceInterface";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  BsFillArrowUpRightSquareFill,
  BsThreeDotsVertical,
} from "react-icons/bs";

const ClientListPage = () => {
  const sizeTable = useBreakpointValue({ base: "sm", xl: "lg" });
  const [clients, setClients] = useState<ClientInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [prev, setPrev] = useState();
  const [next, setNext] = useState();

  useEffect(() => {
    const url = "auth/client/?search=" + search;
    getClient(url);
  }, [search]);

  const getClient = (url: string) => {
    setLoading(true);
    getClientsAllApi(url)
      .then((res) => {
        setClients(res.data.results);
        setPrev(res.data.previous);
        setNext(res.data.next);
      })
      .catch((err) => console.log(err.response))
      .finally(() => setLoading(false));
  };

  return (
    <Box w="full">
      <Box h={1}>
        {loading && <Progress flex={1} isIndeterminate size="xs" />}
      </Box>
      <Card overflowX="auto" className="scroll">
        <Flex justify="space-between">
          <Heading size="lg">Clientes</Heading>
          <Input
            name="search"
            variant="filled"
            placeholder="Buscar cliente..."
            w="auto"
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="none"
          />
        </Flex>
        <Table size={sizeTable}>
          <TableCaption>Clientes</TableCaption>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Apellido</Th>
              <Th>correo</Th>
              <Th>phone</Th>
              <Th>Referencia</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {clients.map((client) => (
              <TableItem key={client.id} client={client} />
            ))}
          </Tbody>
        </Table>

        <Box alignSelf="end">
          {prev && (
            <Button
              onClick={() => getClient(prev + "&search=" + search)}
              me={1}
              colorScheme="blue"
              leftIcon={<FaAngleLeft />}
            >
              Página anterior
            </Button>
          )}
          {next && (
            <Button
              onClick={() => getClient(next + "&search=" + search)}
              colorScheme="blue"
              rightIcon={<FaAngleRight />}
            >
              Página siguiente
            </Button>
          )}
        </Box>
      </Card>
    </Box>
  );
};

interface TableItemProps {
  client: ClientInterface;
}

const TableItem = ({ client }: TableItemProps) => {
  return (
    <Tr>
      <Td>{client.first_name}</Td>
      <Td>{client.last_name}</Td>
      <Td>{client.email}</Td>
      <Td>{client.phone}</Td>
      <Td>{client.reference}</Td>
      <Td>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<BsThreeDotsVertical />}
            variant="ghost"
          ></MenuButton>
          <MenuList>
            <Link to={"/service/add/" + client.id}>
              <MenuItem icon={<BsFillArrowUpRightSquareFill />}>
                Vender servicio
              </MenuItem>
            </Link>
            <Link to={"/profile/" + client.id}>
              <MenuItem icon={<BsFillArrowUpRightSquareFill />}>
                ver perfil
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
};

export default ClientListPage;
