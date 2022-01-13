import { serviceInit } from "../../page/ServiceAddPage";
import {
  CloseButton,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Button from "../forms/Button";
import { Box } from "@chakra-ui/react";
import AdvanceForm from "./AdvanceForm";
import { FaDollarSign } from "react-icons/fa";
import StatsCard from "./StactsCard";
import { Card } from "../utils/Card";
import InputText from "../forms/InputText";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";

interface Props {
  services: typeof serviceInit[];
  removeService: (name: string) => void;
}

const ServiceList = ({ services, removeService }: Props) => {
  let precioTotal = 0;
  let prejectoTotal = 0;

  services.forEach((service) => {
    precioTotal += Number(service.cost) * service.amount;
    prejectoTotal += service.amount;
  });

  return (
    <Box p="5" className="scroll">
      <Heading size="lg" my={3}>
        Resúmen de servicios
      </Heading>
      <Box mb="5">
        <Table size="sm">
          {/* <TableCaption>Lista de servicios</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Servicio</Th>
              {/* <Th>Descripción</Th> */}
              <Th>tamaño</Th>
              <Th>Costo </Th>
              <Th>Unidades</Th>
              <Th>Parcial</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {services.map((service, idx) => (
              <Tr key={idx}>
                <Td
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  maxW={40}
                >
                  {service.name}
                </Td>
                {/* <Td
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  maxW={40}
                >
                  {service.description}
                </Td> */}
                <Td>{service.size}</Td>
                <Td isNumeric>{service.cost}</Td>
                <Td isNumeric>{service.amount}</Td>
                <Td isNumeric>{Number(service.cost) * service.amount}</Td>
                <Td>
                  <CloseButton
                    color="red.500"
                    onClick={() => removeService(service.name)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th colSpan={3}>Total</Th>
              <Th isNumeric>{prejectoTotal}</Th>
              <Th isNumeric>{precioTotal}</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
      <Stack my="5" direction={{ base: "column", lg: "row" }}>
        <Card p="5" w="full">
          <StatsCard
            title="Precio total"
            stat={precioTotal + " Soles"}
            icon={<FaDollarSign size={30} />}
          />
        </Card>
        <Card p="5" w="full">
          <StatsCard
            title="Cantidad de proyectos"
            stat={prejectoTotal}
            icon={<AiOutlineFundProjectionScreen size={30} />}
          />
        </Card>
      </Stack>
      <AdvanceForm base_name="payments." />
      <InputText
        name={"end_date"}
        label="Fecha de entrega"
        type="datetime-local"
      />
      <Button title="Guardar" type="submit" size="lg" />
    </Box>
  );
};

export default ServiceList;