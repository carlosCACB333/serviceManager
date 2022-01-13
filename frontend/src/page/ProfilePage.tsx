import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  List,
  Progress,
  Text,
} from "@chakra-ui/react";
import { Card } from "../Component/utils/Card";
import {
  ClientInterface,
  TicketInterface,
} from "../interfaces/serviceInterface";
import { useParams } from "react-router-dom";
import { getClientApi, getClientTicketApi } from "./../helpers/api";
import TicketTable from "../Component/services/TicketTable";
import ClientUpdate from "../Component/clients/ClientUpdate";
import { updateClientApi } from "../helpers/api";
import { useToast } from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import BackgroundProfile from "../Component/auth/BacgroundProfile";
import ProfeItem from "../Component/auth/ProfileItem";

const ProfilePage = () => {
  const { id } = useParams();
  const toast = useToast();
  const [btnOption, setBtnOption] = useState(1);
  const [client, setClient] = useState<ClientInterface>({} as ClientInterface);
  const [tickets, setTickets] = useState<TicketInterface[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (id) {
      Promise.all([getClientApi(id), getClientTicketApi(id)])
        .then((res) => {
          setClient(res[0].data);
          setTickets(res[1].data.results);
        })
        .catch((err) => console.log(err.response))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <Progress flex={1} isIndeterminate size="xs" />;

  const updateClient = (
    data: ClientInterface,
    action: FormikHelpers<ClientInterface>
  ) => {
    updateClientApi(data.id || 0, data)
      .then((res) => {
        setClient(res.data);
        toast({
          position: "top-end",
          status: "success",
          title: "Actualizado",
          description: "El Cliente a sido actualizado  con éxito",
          isClosable: true,
        });
      })
      .catch((err) => {
        if (err.response.data) {
          action.setErrors(err.response.data);
        }
      });
  };

  return (
    <Flex direction="column" w="full">
      <BackgroundProfile
        setBtnOption={setBtnOption}
        btnOption={btnOption}
        name={client?.first_name + " " + client?.last_name}
        email={client?.email}
      />
      <Grid templateColumns="repeat(12,1fr)" gap="2">
        <GridItem colSpan={{ base: 12, lg: 6, xl: 4, "2xl": 3 }}>
          <Card>
            <Box p="12px 5px" mb="12px">
              <Text fontSize="lg" fontWeight="bold">
                Datos personales
              </Text>
            </Box>
            <Box px="5px">
              <Box mb="12px">
                <List spacing={3}>
                  <ProfeItem name="Nombre" value={client?.first_name} />
                  <ProfeItem name="Apellido" value={client?.last_name} />
                  <ProfeItem name="Email" value={client?.email} />
                  <ProfeItem name="Dirección" value={client?.address} />
                  <ProfeItem name="Referencia" value={client?.reference} />
                  <ProfeItem name="Empresa" value={client?.company} />
                  <ProfeItem name="Teléfono" value={client?.phone} />
                </List>
              </Box>
            </Box>
          </Card>
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 6, xl: 8, "2xl": 9 }}>
          <Card className="scroll" overscrollX="auto">
            <>
              {btnOption === 1 && <TicketTable tickets={tickets} size="sm" />}
              {btnOption === 2 && (
                <ClientUpdate values={client} updateClient={updateClient} />
              )}
            </>
          </Card>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default ProfilePage;
