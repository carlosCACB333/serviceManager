import {
  Badge,
  IconButton,
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
import moment from "moment";
import {
  BsFillArrowUpRightSquareFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { getStatsTicket } from "../../helpers/TicketHelpers";
import { TicketInterface } from "../../interfaces/serviceInterface";

interface Props {
  tickets: TicketInterface[];
  mode?: "all" | "short";
  [x: string]: any;
}
const TicketTable = ({ tickets, mode = "all", ...rest }: Props) => {
  const sizeTable = useBreakpointValue({ base: "sm", xl: "lg" });
  return (
    <Table size={sizeTable} {...rest}>
      <TableCaption>Lista de servicios</TableCaption>
      <Thead>
        <Tr>
          <Th>N°</Th>
          <Th>Cliente</Th>
          {mode === "all" && (
            <>
              <Th>Contrato</Th>
              <Th>Proyectos</Th>
              <Th>Costo</Th>
              <Th>Adelanto</Th>
            </>
          )}
          <Th>Estado</Th>
          <Th w="full">Entrega</Th>
          {mode === "all" && <Th w="full">Garantía</Th>}
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {tickets.map((ticket, idx) => (
          <TableItem ticket={ticket} key={ticket.id} idx={idx} mode={mode} />
        ))}
      </Tbody>
    </Table>
  );
};

const TableItem = ({
  ticket,
  idx,
  mode = "all",
}: {
  ticket: TicketInterface;
  idx: number;
  mode?: "all" | "short";
}) => {
  const { cantidad, costo, adelanto, estado } = getStatsTicket(ticket);

  const getProgessBarValue = (
    first: Date | moment.MomentInput,
    last: Date | moment.MomentInput
  ) => {
    const diff = moment(last).diff(moment(first));
    const advance = moment().diff(moment(first));
    return (advance / diff) * 100;
  };

  return (
    <Tr key={ticket.id}>
      <Td isNumeric>{idx + 1}</Td>
      <Td>{ticket.client.first_name + " " + ticket.client.last_name}</Td>
      {mode === "all" && (
        <>
          <Td>{moment(ticket?.date).format("L")}</Td>
          <Td isNumeric>{cantidad}</Td>
          <Td isNumeric>{costo}</Td>
          <Td isNumeric>{adelanto}</Td>
        </>
      )}
      <Td isNumeric>
        {estado <= 0 ? (
          <Badge colorScheme="green">Cancelado</Badge>
        ) : (
          <Badge colorScheme="red">- S/{estado} </Badge>
        )}
      </Td>
      <Td textAlign="center" flex="1">
        {moment(ticket.end_date).fromNow()}

        <Progress
          value={getProgessBarValue(ticket.date, ticket.end_date)}
          size="xs"
          rounded={5}
        />

        {Math.floor(getProgessBarValue(ticket.date, ticket.end_date)) + "%  "}
      </Td>

      {mode === "all" && (
        <Td textAlign="center">
          {ticket.start_warranty ? (
            <>
              {Math.floor(getProgessBarValue(ticket.date, ticket.end_date)) +
                "%"}

              <Progress
                value={getProgessBarValue(ticket.date, ticket.end_date)}
                size="xs"
                rounded={5}
              />
            </>
          ) : (
            "Aun no inicia"
          )}
        </Td>
      )}

      <Td>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<BsThreeDotsVertical />}
            variant="ghost"
          ></MenuButton>
          <MenuList>
            <Link to={"/ticket/" + ticket.id}>
              <MenuItem icon={<BsFillArrowUpRightSquareFill />}>
                Detalle de la venta
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
};

export default TicketTable;
