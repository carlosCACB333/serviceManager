import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';

import moment from 'moment';
import { PaymentInterface } from '../../interfaces/serviceInterface';
import Confirm from '../utils/Confirm';

interface Props {
  editable?: boolean;
  advances: PaymentInterface[];
  removeAdvance: (id: number) => void;
}

const AdvanceTable = ({ editable = true, advances, removeAdvance }: Props) => {
  let total = 0;
  advances.forEach((adv) => {
    total += Number(adv.amount);
  });
  return (
    <Table size="sm">
      {/* <TableCaption>Lista de servicios</TableCaption> */}
      <Thead>
        <Tr>
          <Th>Fecha</Th>
          <Th>cantidad </Th>
          <Th>Detalle</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {advances.map((advance) => (
          <Tr key={advance.id}>
            <Td>{moment(advance.date).format('LLLL')}</Td>
            <Td isNumeric>{advance.amount}</Td>
            <Td>{advance.detail}</Td>
            <Td>
              {editable && (
                <Confirm
                  desc={'Esta acción es irreversible. ¿Deseas eliminar este pago?'}
                  onClick={() => removeAdvance(advance.id)}
                  type="close"
                />
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Total</Th>
          <Th isNumeric>{total}</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

export default AdvanceTable;
