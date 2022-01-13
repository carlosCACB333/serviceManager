import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Card } from "../Component/utils/Card";
import { useNavigate, useParams } from "react-router-dom";
import {
  addAdvanceApi,
  CloseProjectApi,
  deleteTicketApi,
  getDetailTicketApi,
  removeAdvanceApi,
  removeServiceApi,
} from "../helpers/api";
import {
  TicketInterface,
  PaymentInterface,
} from "../interfaces/serviceInterface";
import {
  FaCheckCircle,
  FaDirections,
  FaDollarSign,
  FaTimesCircle,
} from "react-icons/fa";
import moment from "moment";
import "moment/locale/es";
import ServiceTable from "../Component/services/ServiceTable";
import AdvanceTable from "../Component/services/AdvanceTable";
import AdvanceForm from "../Component/services/AdvanceForm";
import { Form, Formik, FormikHelpers } from "formik";
import { useToast } from "@chakra-ui/react";
import NotFound from "../Component/utils/NotFound";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { updateServiceApi, finishProjectApi } from "../helpers/api";
import { getStatsTicket } from "../helpers/TicketHelpers";
import { paymentValidator } from "../validators/formValidator";
import StatsCard2 from "../Component/services/StactsCard2";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import Confirm from "../Component/utils/Confirm";

moment.locale("es");

const ServiceDetailPage = () => {
  const { id = "" } = useParams();
  const [ticket, setTicket] = useState<TicketInterface>({} as TicketInterface);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const toas = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getDetailTicketApi(id)
      .then((res) => setTicket(res.data))
      .catch((err) => setError(err.response.data.detail))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddSubmit = (
    values: PaymentInterface,
    action: FormikHelpers<PaymentInterface>
  ) => {
    addAdvanceApi(values)
      .then((res) => {
        setTicket((state) => ({
          ...state,
          payments: [...state.payments, res.data],
        }));
        onToggle();
        toas({
          position: "top-end",
          status: "success",
          title: "Registrado",
          description: "Adelanto Registrado",
          isClosable: true,
        });
      })
      .catch((err) => action.setErrors(err.response.data));
  };

  const removeAdvance = (id: number) => {
    removeAdvanceApi(id)
      .then((res) => {
        setTicket((state) => ({
          ...state,
          payments: state.payments.filter((ad) => ad.id !== id),
        }));
        toas({
          position: "top-end",
          status: "error",
          title: "Eliminado",
          description: "Adelanto removido",
          isClosable: true,
        });
      })
      .catch((err) => console.log(err.response));
  };

  const removeService = (id: number) => {
    removeServiceApi(id)
      .then((res) => {
        setTicket((state) => ({
          ...state,
          services: state.services.filter((serv) => serv.id !== id),
        }));
        toas({
          position: "top-end",
          status: "error",
          title: "Eliminado",
          description: "Servicio removido",
          isClosable: true,
        });
      })
      .catch((err) => console.log(err.resonse));
  };

  const updateService = (
    data: ServiceInterface,
    action: FormikHelpers<ServiceInterface>
  ) => {
    return updateServiceApi(data.id, data)
      .then((res) => {
        setTicket((state) => ({
          ...state,
          services: state.services.map((serv) =>
            serv.id === res.data.id ? res.data : serv
          ),
        }));
        toas({
          position: "top-end",
          status: "success",
          title: "Actualizado",
          description: "Servicio actualizado",
          isClosable: true,
        });

        return true;
      })
      .catch((err) => {
        if (err.response.data) {
          action.setErrors(err.response.data);
        }
        return false;
      });
  };

  const finishProject = (id: number) => {
    finishProjectApi(id)
      .then((res) => {
        setTicket((state) => ({ ...state, ...res.data.ticket }));
        toas({
          position: "top-end",
          status: "success",
          title: "Finalizado",
          description: "Proyecto finalizado",
          isClosable: true,
        });
      })
      .catch((err) => console.log(err.response));
  };

  const closeProject = (id: number) => {
    CloseProjectApi(id)
      .then((res) => {
        setTicket(res.data.ticket);
        toas({
          position: "top-end",
          status: "success",
          title: "Cerrado",
          description: "El proyecto a sido cerrado con éxito",
          isClosable: true,
        });
      })
      .catch((err) => console.log(err.response));
  };

  const deleteProject = (id: number) => {
    deleteTicketApi(id)
      .then((res) => {
        toas({
          position: "top-end",
          status: "success",
          title: "Eliminado",
          description: "El ticket a sido eliminado con éxito",
          isClosable: true,
        });

        navigate("/service/list");
      })
      .catch((err) => console.log(err.response));
  };

  if (error) return <NotFound title={error} />;
  if (loading) return <Progress size="xs" isIndeterminate w="full" />;
  const { cantidad, costo, adelanto, estado } = getStatsTicket(ticket);

  return (
    <Grid gap="2" templateColumns="repeat(6, 1fr)">
      <GridItem colSpan={6}>
        <SimpleGrid columns={[1, null, 2, 4]} spacing={3}>
          <Card p="2" border="1px">
            <StatsCard2
              title="Costo total"
              stat={"S/ " + costo}
              icon={<FaDollarSign size={20} />}
            />
          </Card>
          <Card p="2" border="1px">
            <StatsCard2
              title="Estado pago"
              stat={estado <= 0 ? "CANCELADO" : "Debe S/ " + estado}
              icon={
                estado <= 0 ? (
                  <FaCheckCircle size={20} />
                ) : (
                  <FaTimesCircle size={20} />
                )
              }
            />
          </Card>
          <Card p="2" border="1px">
            <StatsCard2
              title="Estado entrega"
              stat={ticket.finish_date ? "Entregado" : "NO ENTREGADO"}
              icon={
                ticket.finish_date ? (
                  <FaCheckCircle size={20} />
                ) : (
                  <FaTimesCircle size={20} />
                )
              }
            />
          </Card>

          <Card p="2" border="1px">
            <StatsCard2
              title="Cantidad de proyectos"
              stat={cantidad}
              icon={<AiOutlineFundProjectionScreen size={20} />}
            />
          </Card>
        </SimpleGrid>
      </GridItem>
      <GridItem colSpan={{ base: 6, xl: 2 }}>
        <Card>
          <Heading mb="2" size="md">
            Detalle de ticket
          </Heading>

          <List spacing={3}>
            <ListItm name="Fecha" value={moment(ticket?.date).format("LLLL")} />
            <ListItm name="Costo total" value={"S/ " + costo} />
            <ListItm name="Adelanto" value={"S/ " + adelanto} />
            <ListItm name="Cantidad de proyectos" value={cantidad} />
            <ListItm
              name="Estado de pago"
              value={estado <= 0 ? "CANCELADO" : "Debe S/ " + estado}
            />
            <ListItm
              name="Estado del proyecto"
              value={
                ticket.finish_date
                  ? "Entregado el " + moment(ticket.finish_date).format("LLLL")
                  : "NO ENTREGADO"
              }
            />
            <ListItm
              name="Cliente"
              value={ticket?.client.first_name + " " + ticket?.client.last_name}
            />

            <ListItm name="Correo" value={ticket?.client.email} />
            <ListItm name="Teléfono" value={ticket?.client.phone} />
            <ListItm name="Dirección" value={ticket?.client.address} />
            <ListItm name="Empresa" value={ticket?.client.company} />
            <ListItm name="Referencia" value={ticket?.client.reference} />
          </List>

          <Flex my="2" flexWrap="wrap" gap={1}>
            {!ticket.finish_date && (
              <Confirm
                title="Entregar Proyecto"
                onClick={() => finishProject(ticket.id)}
                colorScheme="blue"
                size="lg"
              />
            )}
            {!ticket.is_closed && (
              <Confirm
                title="Cerrar venta"
                desc="Esta acción es irreversible. Una vez que cierres la venta ya no podrás hacer ediciones.¿Deseas continuar?"
                onClick={() => closeProject(ticket.id)}
                colorScheme="blue"
                size="lg"
              />
            )}

            {!ticket.is_closed && (
              <Confirm
                title="Eliminar ticket"
                desc="Esta acción es irreversible.¿Deseas Eliminar el ticket?"
                onClick={() => deleteProject(ticket.id)}
                colorScheme="red"
                size="lg"
              />
            )}
          </Flex>
        </Card>
      </GridItem>
      <GridItem colSpan={{ base: 6, xl: 4 }}>
        <Card flex="3" className="scroll">
          <Heading mb="2" size="md">
            Lista de servicios
          </Heading>
          <ServiceTable
            editable={!ticket.is_closed}
            services={ticket?.services}
            removeService={removeService}
            updateService={updateService}
          />
        </Card>

        <Card mt="2">
          <Heading mb="2" size="md">
            Registro de pagos
          </Heading>
          <Stack>
            {ticket?.payments && ticket.payments.length > 0 ? (
              <Box className="scroll">
                <AdvanceTable
                  editable={!ticket.is_closed}
                  advances={ticket?.payments}
                  removeAdvance={removeAdvance}
                />
              </Box>
            ) : (
              <Text color="gray.500" ms={10}>
                No hay adelantos
              </Text>
            )}
            <Stack direction="row">
              {!ticket.is_closed && (
                <>
                  <Button onClick={onOpen}>Registrar pago</Button>
                </>
              )}
            </Stack>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Registrar pago</ModalHeader>
                <ModalCloseButton />
                <Formik
                  initialValues={{
                    id: 0,
                    detail: "",
                    ticket: ticket.id,
                    amount: "",
                  }}
                  onSubmit={handleAddSubmit}
                  validationSchema={paymentValidator}
                >
                  {() => (
                    <Form>
                      <ModalBody>
                        <AdvanceForm />
                      </ModalBody>
                      <ModalFooter>
                        <Button mx="1" colorScheme="blue" type="submit">
                          Guardar
                        </Button>
                        <Button mx="1" colorScheme="gray" onClick={onClose}>
                          Cancelar
                        </Button>
                      </ModalFooter>
                    </Form>
                  )}
                </Formik>
              </ModalContent>
            </Modal>
          </Stack>
        </Card>
      </GridItem>
    </Grid>
  );
};

const ListItm = ({ name = "", value = "" }: { name: any; value: any }) => {
  return (
    <ListItem>
      <ListIcon as={FaDirections} color="blue.500" />
      <Text color="gray.500" fontWeight="bold" d="inline">
        {name}
      </Text>
      &nbsp;
      <Text color="gray.500" d="inline">
        {value}
      </Text>
    </ListItem>
  );
};

export default ServiceDetailPage;
