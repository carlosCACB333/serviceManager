import { Flex, Heading, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useDispatch } from 'react-redux';
import { startAddUser, startGetUserAll, startUpdateUser } from '../actions/userAction';
import Button from '../Component/forms/Button';
import UserForm from '../Component/Users/UserForm';
import UserTable from '../Component/Users/UserTable';
import { Card } from '../Component/utils/Card';
import { useTypeSelector } from '../hooks/useTypeSelector';
import { UserInit, UserInterface } from '../interfaces/userInterfaces';
import { userAddValidator, userUpdateValidator } from '../validators/formValidator';

const UserPage = () => {
  const dispatch = useDispatch();
  const users = useTypeSelector((state) => state.users);
  const toast = useToast();

  const handleSubmit = (values: UserInterface, action: FormikHelpers<UserInterface>) => {
    if (users.selected) {
      // dispatch(startUpdateUser(values, action, toast));
      dispatch(startUpdateUser(values, action, toast) as any);
    } else {
      dispatch(startAddUser(values, action, toast) as any);
    }
  };

  useEffect(() => {
    dispatch(startGetUserAll() as any);
  }, [dispatch]);

  return (
    <Flex direction={{ base: 'column', xl: 'row' }} gap={2} w="full" justify="center">
      <Card>
        <Formik
          initialValues={UserInit}
          onSubmit={handleSubmit}
          validationSchema={users.selected ? userUpdateValidator : userAddValidator}
        >
          {(props) => <FormikChild {...props} />}
        </Formik>
      </Card>

      <Card className="scroll" overflowX="auto">
        <UserTable users={users.users} />
      </Card>
    </Flex>
  );
};

const FormikChild = ({ setValues, setFieldTouched }: FormikProps<UserInterface>) => {
  const dispatch = useDispatch();
  const users = useTypeSelector((state) => state.users);
  useEffect(() => {
    if (users.selected) {
      setValues({ ...users.selected, password: '' });
      setFieldTouched('password2', true);
    }
  }, [users.selected, setValues, setFieldTouched]);

  const handleOfSelected = () => {
    setValues(UserInit);
    dispatch({ type: 'userOfSelection' });
  };

  return (
    <Form>
      <Heading size="md" my={2}>
        {users.selected ? 'Actualizar usuario' : 'Crear usuario'}
      </Heading>

      <UserForm />
      <Flex flexDir={{ base: 'column', lg: 'row' }} gap={2}>
        <Button
          title={users.selected ? 'Actualizar usuario' : 'Crear usuario'}
          type="submit"
          bgGradient="blue"
          colorScheme="blue"
        />
        {users.selected && <Button title="Cancelar" onClick={() => handleOfSelected()} />}
      </Flex>
    </Form>
  );
};

export default UserPage;
