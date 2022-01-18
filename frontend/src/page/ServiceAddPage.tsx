import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Heading,
  Progress,
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
import NotFound from "../Component/utils/NotFound";

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
  touched,
  setValues,
  services,
  setServices,
  setErrors,
  setFieldTouched,
  setTouched,
  setSubmitting,
}: FormikChildProps) => {
  const param = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (param.id) {
      setLoading(true);
      getClientApi(param.id)
        .then((res) => {
          setValues({ ...formiInit, client: res.data });
        })
        .catch((err) => {
          console.log(err.response);
          setError(err.response.data.detail);
        })
        .finally(() => setLoading(false));
    } else {
      setValues(formiInit);
    }
  }, [param.id, setValues]);

  const removeService = (name: string) => {
    setServices((state) => state.filter((serv) => serv.name !== name));
  };

  const handleAddService = () => {
    let err: any = {};

    if (!values.services.name.trim()) {
      err.name = "Este campo es requerido";
    }

    if (!values.services.amount) {
      err.amount = "Este campo es requerido";
    }
    if (!values.services.cost.trim()) {
      err.cost = "Este campo es requerido";
    }

    if (Object.keys(err).length === 0) {
      setServices((state) => [...state, { ...values.services }]);
      setValues({ ...values, services: serviceInit });
    } else {
      setTouched(
        {
          ...touched,
          services: { name: true, cost: true, amount: true },
        },
        false
      );

      setErrors({ ...errors, services: err });
    }
  };
  if (error) return <NotFound title={error} />;
  if (loading) return <Progress size="xs" isIndeterminate w="full" />;
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
          {!param.id && (
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
          )}
          <Card>
            <ServiceForm base_name="services." />
            <Button
              title="Agregar Servicio"
              w="auto"
              onClick={handleAddService}
            />
          </Card>
        </Flex>
        <Box border="1px solid gray " rounded="xl" me={2}>
          <ServiceList
            services={services}
            removeService={removeService}
            client={values.client.first_name + " " + values.client.last_name}
          />
        </Box>
      </Flex>
    </Form>
  );
};

export default ServiceAddPage;
