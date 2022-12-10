import { Heading, Stack } from '@chakra-ui/react';
import Area from '../forms/Area';
import InputText from '../forms/InputText';

const ServiceForm = ({ base_name = '' }: { base_name?: string }) => {
  // const formik = useFormikContext<typeof formiInit>();

  return (
    <>
      <Heading size="lg" mb={3}>
        Datos del servicio
      </Heading>

      <InputText name={base_name + 'name'} label="Nombre de servicio" placeholder="Nombre corto del servicio" />
      <InputText name={base_name + 'size'} label="Medida del proyecto" placeholder="Medida del proyecto" />
      <InputText name={base_name + 'address'} label="Dirección" placeholder="Dirección de instalación" />

      <Stack direction={{ base: 'column', xl: 'row' }}>
        <InputText name={base_name + 'cost'} label="Costo" type="number" placeholder="Costo del servicio" />
        <InputText name={base_name + 'amount'} label="cantidad" type="number" />
      </Stack>
      <Area name={base_name + 'description'} label="Descripción" placeholder="todo los detalles del proyecto" />
    </>
  );
};

export default ServiceForm;
