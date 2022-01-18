import {
  Box,
  Progress,
  SimpleGrid,
  Heading,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaDollarSign,
  FaUsers,
  FaUsersCog,
} from "react-icons/fa";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import StatsCard from "../Component/services/StactsCard";
import StatsCard2 from "../Component/services/StactsCard2";
import { Card } from "../Component/utils/Card";
import { getReportApi } from "../helpers/api";
import SalesChar from "../Component/services/SalesChar";
import TicketTable from "../Component/services/TicketTable";
import { TicketInterface } from "../interfaces/serviceInterface";

interface ReportpProps {
  users: number;
  clients: number;
  tickets: number;
  services: number;
  tickets_due: TicketInterface[];
  ticket_count: { [x: number]: number };
  takings: { [x: number]: number };
  sales_total: string;
  canceled_total: string;
}
const HomePage = () => {
  const [report, setReport] = useState<ReportpProps>();
  useEffect(() => {
    getReportApi()
      .then((res) => setReport(res.data))
      .catch((err) => console.log(err.response));
  }, []);

  if (!report) return <Progress size="xs" isIndeterminate w="full" />;

  return (
    <Box w="full">
      <SimpleGrid columns={[1, null, 2, 4]} spacing={3}>
        <Card p={5}>
          <StatsCard
            title="Clientes"
            stat={report.clients}
            icon={<FaUsersCog size={20} />}
          />
        </Card>
        <Card p={5}>
          <StatsCard
            title="Usuarios"
            stat={report.users}
            icon={<FaUsers size={20} />}
          />
        </Card>
        <Card p={5}>
          <StatsCard
            title="Boletas"
            stat={report.tickets}
            icon={<FaClipboardList size={20} />}
          />
        </Card>
        <Card p={5}>
          <StatsCard
            title="Proyectos"
            stat={report.services}
            icon={<AiOutlineFundProjectionScreen size={20} />}
          />
        </Card>
      </SimpleGrid>

      <Grid w="full" my="3" gap={3} templateColumns="repeat(6, 1fr)">
        <GridItem colSpan={{ base: 6, xl: 2 }}>
          <Card h="full">
            <Heading size="md" mb="3">
              Total de ventas
            </Heading>
            <Flex flexWrap="wrap" gap={2} justifyContent="center">
              <Card p="5" border="1px">
                <StatsCard2
                  title="Total de ventas"
                  stat={"S/" + report.sales_total}
                  icon={<FaDollarSign size={20} />}
                />
              </Card>
              <Card p="5" border="1px">
                <StatsCard2
                  title="Total cancelado"
                  stat={"S/" + report.canceled_total}
                  icon={<FaDollarSign size={20} />}
                />
              </Card>
              <Card p="5" border="1px">
                <StatsCard2
                  title="saldo por cobrar"
                  stat={`S/${
                    Number(report.sales_total) - Number(report.canceled_total)
                  }`}
                  icon={<FaDollarSign size={20} />}
                />
              </Card>
            </Flex>
          </Card>
        </GridItem>
        <GridItem colSpan={{ base: 6, xl: 4 }}>
          <SalesChar report={report.takings} title="Visión general de ventas" />
        </GridItem>

        <GridItem colSpan={{ base: 6, xl: 3 }}>
          <Card h="full" overflowX="auto" className="scroll">
            <Heading size="md" mb="3">
              Próximas entregas
            </Heading>

            <TicketTable tickets={report.tickets_due} mode="short" size="sm" />
          </Card>
        </GridItem>
        <GridItem colSpan={{ base: 6, xl: 3 }}>
          <SalesChar
            report={report.ticket_count}
            title="Cantidad de boletas"
            color="red"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default HomePage;
