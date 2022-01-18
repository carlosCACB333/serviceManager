import { Button, Flex, Heading, Input, Progress } from "@chakra-ui/react";
import { useState } from "react";
import { Card } from "../Component/utils/Card";
import { useEffect } from "react";
import { listServiceApi } from "../helpers/api";
import { Box } from "@chakra-ui/react";
import { TicketInterface } from "../interfaces/serviceInterface";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import TicketTable from "../Component/services/TicketTable";

const ServiceListPage = () => {
  const [tickets, setTickets] = useState<TicketInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();

  useEffect(() => {
    const url = "service/ticket/?search=" + search;
    listService(url);
  }, [search]);

  const listService = (url: string) => {
    setLoading(true);
    listServiceApi(url)
      .then((res) => {
        setPrev(res.data.previous);
        setNext(res.data.next);
        setTickets(res.data.results);
      })
      .catch((err) => console.log(err.response))
      .finally(() => setLoading(false));
  };

  return (
    <Box w="full">
      <Box h={1}>
        {loading && <Progress flex={1} isIndeterminate size="xs" />}
      </Box>
      <Card w="full" overflowX="auto" className="scroll">
        <Flex justify="space-between" mb={3}>
          <Heading size="lg">Ventas</Heading>
          <Input
            ms={2}
            name="search"
            variant="filled"
            placeholder="Buscar boleta..."
            w="auto"
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="none"
          />
        </Flex>
        <TicketTable tickets={tickets} />
        <Box>
          {prev && (
            <Button
              onClick={() => listService(prev + "&search=" + search)}
              me={1}
              colorScheme="blue"
              leftIcon={<FaAngleLeft />}
            >
              Página anterior
            </Button>
          )}
          {next && (
            <Button
              onClick={() => listService(next + "&search=" + search)}
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

export default ServiceListPage;
