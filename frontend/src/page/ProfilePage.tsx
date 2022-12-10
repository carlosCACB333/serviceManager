import { Box, Flex, Heading, List, Progress, Text, useToast } from '@chakra-ui/react';
import { FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { FaListOl, FaUserEdit } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import BackgroundProfile from '../Component/auth/BacgroundProfile';
import ProfeItem from '../Component/auth/ProfileItem';
import ClientUpdate from '../Component/clients/ClientUpdate';
import Rating from '../Component/clients/Rating';
import TicketTable from '../Component/services/TicketTable';
import { Card } from '../Component/utils/Card';
import NotFound from '../Component/utils/NotFound';
import { updateClientApi } from '../helpers/api';
import { ClientInterface, TicketInterface } from '../interfaces/serviceInterface';
import { getClientApi, getClientTicketApi } from './../helpers/api';

const options = [
  { value: 1, name: 'Lista de ventas', icon: FaListOl },
  { value: 2, name: 'Actualizar datos', icon: FaUserEdit },
];

const ProfilePage = () => {
  const { id } = useParams();
  const toast = useToast();
  const [btnOption, setBtnOption] = useState(1);
  const [client, setClient] = useState<ClientInterface>({} as ClientInterface);
  const [tickets, setTickets] = useState<TicketInterface[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      Promise.all([getClientApi(id), getClientTicketApi(id)])
        .then((res) => {
          setClient(res[0].data);
          setTickets(res[1].data.results);
        })
        .catch((err) => {
          console.log(err.response);
          setError(err.response.data.detail);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const updateClient = (data: ClientInterface, action: FormikHelpers<ClientInterface>) => {
    updateClientApi(data.id || 0, data)
      .then((res) => {
        setClient(res.data);
        toast({
          position: 'top-right',
          status: 'success',
          title: 'Actualizado',
          description: 'El Cliente a sido actualizado  con éxito',
          isClosable: true,
        });
      })
      .catch((err) => {
        if (err.response.data) {
          action.setErrors(err.response.data);
        }
      });
  };

  if (error) return <NotFound title={error} />;
  if (loading) return <Progress size="xs" isIndeterminate w="full" />;

  return (
    <Flex direction="column" w="full">
      <BackgroundProfile
        options={options}
        setBtnOption={setBtnOption}
        btnOption={btnOption}
        name={client?.first_name + ' ' + client?.last_name}
        email={client?.email}
      />
      <Flex gap="2" direction={{ base: 'column-reverse', lg: 'row' }}>
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

          <Heading size="sm" my={2}>
            Calificacion del cliente
          </Heading>
          <Rating id={client.id || 0} initValue={client.score || 0} />
        </Card>

        <Flex flex={1} justify="center">
          <Card className="scroll" overscrollX="auto" w={{ base: 'full', lg: 'auto' }}>
            <>
              {btnOption === 1 && <TicketTable tickets={tickets} size="sm" />}
              {btnOption === 2 && <ClientUpdate values={client} updateClient={updateClient} />}
            </>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfilePage;
