import { Stack } from '@chakra-ui/react';
import Area from '../forms/Area';
import InputText from '../forms/InputText';

const AdvanceForm = ({ base_name = '' }) => {
  return (
    <>
      <Stack direction={{ base: 'column', lg: 'row' }}>
        <InputText
          type="number"
          name={base_name + 'amount'}
          label="Pago (total o adelanto)"
          help="Pago total o adelanto"
        />
      </Stack>
      <Area name={base_name + 'detail'} label="Detalle del adelanto" placeholder="Detalle de pago" />
    </>
  );
};

export default AdvanceForm;
