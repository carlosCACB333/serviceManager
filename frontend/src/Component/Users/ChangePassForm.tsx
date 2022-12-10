import { SimpleGrid, useToast } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { changePasswordApi } from '../../helpers/api';
import { ChangePassInterface } from '../../interfaces/userInterfaces';
import { changePasswordValidator } from '../../validators/formValidator';
import Button from '../forms/Button';
import InputText from '../forms/InputText';

const ChangePassForm = () => {
  const toast = useToast();

  const handleUpdate = (values: ChangePassInterface, action: FormikHelpers<ChangePassInterface>) => {
    changePasswordApi(values)
      .then((res) => {
        toast({
          position: 'top-right',
          status: 'success',
          title: 'Actualizado',
          description: 'La contraseña fue actualizado  con éxito',
          isClosable: true,
        });
      })
      .catch((err) => {
        action.setErrors(err.response.data);
      });
  };
  return (
    <Formik
      initialValues={{ password: '', password1: '', password2: '' }}
      onSubmit={handleUpdate}
      validationSchema={changePasswordValidator}
    >
      {() => (
        <Form>
          <SimpleGrid gap={3} columns={{ base: 1, lg: 2 }}>
            <InputText type="password" name="password" placeholder="Contraseña" help="Mínimo 8 caracteres" />
            <InputText type="password" name="password1" placeholder="Nueva contraseña" help="Mínimo 8 caracteres" />
            <InputText type="password" name="password2" placeholder="Confirmar contraseña" help="Mínimo 8 caracteres" />
          </SimpleGrid>

          <Button title="Actualizar Contraseña" type="submit" bgGradient="blue" colorScheme="blue" />
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassForm;
