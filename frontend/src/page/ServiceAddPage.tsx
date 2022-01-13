import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import moment from "moment";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import ClientForm from "../Component/clients/ClientForm";
import Button from "../Component/forms/Button";
import ServiceForm from "../Component/services/ServiceForm";
import ServiceList from "../Component/services/ServiceList";
import { addServiceValidator } from "../validators/formValidator";
import { Card } from "../Component/utils/Card";
import { createServiceApi, getClientApi } from "../helpers/api";
import { useNavigate, useParams } from "react-router-dom";
import {
  ClientInterface,
  PaymentInterface,
  ServiceInterface,
} from "../interfaces/serviceInterface";

moment.locale("es");
// const date = moment().format("YYYY-MM-DDTHH:mm");

export const serviceInit: ServiceInterface = {
  id: 0,
  name: "",
  address: "",
  size: "",
  description: "",
  cost: "",
  amount: 1,
};

export const clientInit: ClientInterface = {
  // id: 0 ,
  first_name: "",
  last_name: "",
  address: "",
  reference: "",
  email: "",
  company: "",
  phone: "",
};

const paymentInit: PaymentInterface = {
  id: 0,
  amount: "",
  detail: "",
};

export const formiInit = {
  client: clientInit,
  services: serviceInit,
  payments: paymentInit,
  end_date: "",
};

const ServiceAddPage = () => {
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const toast = useToast();
  const navigate = useNavigate();

  const submit = (
    values: typeof formiInit,
    action: FormikHelpers<typeof formiInit>
  ) => {
    if (services.length > 0) {
      const data = { ...values, services: services };
      console.log(data);
      createServiceApi(data)
        .then((res) => {
          toast({
            title: "Servicio creado",
            status: "success",
            description: "El servicio fue creado con éxito",
            position: "top-end",
            isClosable: true,
          });
          navigate("/ticket/" + res.data.id);
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.data) {
            action.setErrors(err.response.data);
          }
        });
    } else {
      toast({
        title: "Error",
        status: "error",
        description: "No  has agregado ningún servicio",
        position: "top-end",
        isClosable: true,
      });
    }
  };

  return (
    <Box w="full">
      <Formik
        initialValues={formiInit}
        onSubmit={submit}
        validationSchema={addServiceValidator}
      >
        {(props) => (
          <FormikChild
            {...props}
            services={services}
            setServices={setServices}
          />
        )}
      </Formik>
    </Box>
  );
};

interface FormikChildProps extends FormikProps<typeof formiInit> {
  services: typeof serviceInit[];
  setServices: Dispatch<SetStateAction<typeof serviceInit[]>>;
}

const FormikChild = ({
  errors,
  values,
  setValues,
  services,
  setServices,
  setFieldTouched,
}: FormikChildProps) => {
  const param = useParams();

  useEffect(() => {
    if (param.id) {
      getClientApi(param.id)
        .then((res) => {
          setValues({ ...formiInit, client: res.data });
        })
        .catch((err) => console.log(err.response));
    } else {
      setValues(formiInit);
    }
  }, [param.id, setValues]);

  const removeService = (name: string) => {
    setServices((state) => state.filter((serv) => serv.name !== name));
  };
  return (
    <Form>
      {/* <Heading mb="5">Registro de venta de servicio</Heading> */}
      <Flex gap={2} direction={{ base: "column", lg: "row" }}>
        <Flex
          flex={1}
          gap="1"
          direction={{ base: "column", xl: "row" }}
          justify="center"
        >
          <Card>
            <Heading size="lg" mb={3}>
              Datos del cliente
            </Heading>

            <Box>
              {errors.client?.non_field_errors && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle mr={2}>Error</AlertTitle>
                  {errors.client?.non_field_errors}
                </Alert>
              )}
            </Box>
            <ClientForm
              base_name="client."
              editable={param.id === undefined}
              search={true}
            />
          </Card>
          <Card>
            <ServiceForm base_name="services." />
            <Button
              title="Agregar Servicio"
              w="auto"
              onClick={() => {
                if (!errors.services) {
                  setServices((state) => [...state, { ...values.services }]);
                } else {
                  setFieldTouched("services.name", true);
                }
              }}
            />
          </Card>
        </Flex>
        <Box border="1px solid gray " rounded="xl">
          <ServiceList services={services} removeService={removeService} />
        </Box>
      </Flex>
    </Form>
  );
};

export default ServiceAddPage;
