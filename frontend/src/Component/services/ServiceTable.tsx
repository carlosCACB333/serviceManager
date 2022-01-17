import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { FaEdit } from "react-icons/fa";
import { ServiceInterface } from "../../interfaces/serviceInterface";
import { serviceUpdateValidator } from "../../validators/formValidator";
import Confirm from "../utils/Confirm";
import ServiceForm from "./ServiceForm";

interface Props {
  services?: ServiceInterface[];
  editable?: boolean;
  removeService: (id: number) => void;
  updateService: (
    data: ServiceInterface,
    action: FormikHelpers<ServiceInterface>
  ) => Promise<boolean>;
}

const ServiceTable = ({
  editable = true,
  services = [],
  removeService,
  updateService,
}: Props) => {
  let precioTotal = 0;
  let prejectoTotal = 0;
  services.forEach((service) => {
    precioTotal += Number(service.cost) * service.amount;
    prejectoTotal += service.amount;
  });

  return (
    <>
      <Table size="sm">
        {/* <TableCaption>Lista de servicios</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Servicio</Th>
            <Th>descripción</Th>
            <Th>medida</Th>
            <Th>Dirección</Th>
            <Th>tamaño</Th>
            <Th>Costo </Th>
            <Th>Unidades</Th>
            <Th>Parcial</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {services.map((service) => (
            <Tr key={service.id}>
              <Td>{service.name}</Td>
              <Td>{service.description}</Td>
              <Td>{service.size}</Td>
              <Td>{service.address}</Td>
              <Td>{service.size}</Td>
              <Td isNumeric>{service.cost}</Td>
              <Td isNumeric>{service.amount}</Td>
              <Td isNumeric>{Number(service.cost) * service.amount}</Td>

              <Td>
                {editable && (
                  <Flex align="center">
                    <ModalService
                      service={service}
                      updateService={updateService}
                    />
                    <Confirm
                      onClick={() => removeService(service.id)}
                      type="close"
                    />
                  </Flex>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={6}>Total</Th>
            <Th isNumeric>{prejectoTotal}</Th>
            <Th isNumeric>{precioTotal}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  );
};

interface ModalServiceProps {
  service: ServiceInterface;
  updateService: (
    data: ServiceInterface,
    action: FormikHelpers<ServiceInterface>
  ) => Promise<boolean>;
}

const ModalService = ({ updateService, service }: ModalServiceProps) => {
  const { onOpen, onClose, isOpen, onToggle } = useDisclosure();

  return (
    <>
      <IconButton aria-label="update" icon={<FaEdit />} onClick={onOpen} />

      <Formik
        initialValues={service}
        onSubmit={async (values, action) => {
          const upd = await updateService(values, action);
          if (upd) {
            onToggle();
          }
        }}
        validationSchema={serviceUpdateValidator}
      >
        {() => (
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="inside"
            size="xl"
          >
            <Form>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Registrar adelanto</ModalHeader>
                <ModalCloseButton />
                <ModalBody className="scroll">
                  <ServiceForm />
                </ModalBody>
                <ModalFooter>
                  <Button mx="1" colorScheme="blue" type="submit">
                    Guardar
                  </Button>
                  <Button mx="1" colorScheme="gray" onClick={onClose}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Form>
          </Modal>
        )}
      </Formik>
    </>
  );
};

export default ServiceTable;
