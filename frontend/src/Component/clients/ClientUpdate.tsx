import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import ClientForm from "./ClientForm";
import { ClientInterface } from "../../interfaces/serviceInterface";
import { Form, Formik, FormikHelpers } from "formik";
import Button from "../forms/Button";
import { clientValidator } from "../../validators/formValidator";

interface Props {
  values: ClientInterface;
  updateClient: (
    data: ClientInterface,
    action: FormikHelpers<ClientInterface>
  ) => void;
}

const ClientUpdate = ({ values, updateClient }: Props) => {
  return (
    <Box>
      <Formik
        initialValues={values}
        onSubmit={(val, action) => updateClient(val, action)}
        validationSchema={clientValidator}
      >
        {({ errors }) => (
          <Form>
            <Box>
              {errors.non_field_errors && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle mr={2}>Error</AlertTitle>
                  {errors?.non_field_errors}
                </Alert>
              )}
            </Box>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={2}>
              <ClientForm />
            </SimpleGrid>

            <Button title="Actualizar datos" type="submit" />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ClientUpdate;
