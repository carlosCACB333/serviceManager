import { Stack, useToast } from "@chakra-ui/react";
import { UserInterface } from "../../interfaces/userInterfaces";
import { Form, Formik, FormikHelpers } from "formik";
import InputText from "../forms/InputText";
import Button from "../forms/Button";
import { userUpdateValidator } from "../../validators/formValidator";
import { updateProfileApi } from "../../helpers/api";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
interface Props {
  user: UserInterface;
}
const ProfileUpdateForm = ({ user }: Props) => {
  const { setAuth } = useContext(AuthContext);
  const toast = useToast();

  const handleUpdate = (
    values: UserInterface,
    action: FormikHelpers<UserInterface>
  ) => {
    updateProfileApi(user.id, values)
      .then((res) => {
        setAuth((state) => ({ ...state, user: res.data }));
        toast({
          isClosable: true,
          status: "success",
          title: "Actualizado",
          description: "Los datos se actualizaron correctamente",
          position: "top-end",
        });
      })
      .catch((err) => {
        console.log(err.response);
        action.setErrors(err.response.data);
      });
  };
  return (
    <Formik
      initialValues={{ ...user, password: "" }}
      onSubmit={handleUpdate}
      validationSchema={userUpdateValidator}
    >
      {() => (
        <Form>
          <InputText
            name="username"
            placeholder="Username"
            help="Ingrese su nomobre de usuario"
          />

          <Stack direction={{ base: "column", lg: "row" }}>
            <InputText
              name="first_name"
              label="Nombres"
              placeholder="Nombres"
              help="Ingrese sus nombres"
            />
            <InputText
              name="last_name"
              label="Apellidos"
              placeholder="Apellidos"
              help="Ingrese sus Apellidos"
            />
          </Stack>

          <Stack direction={{ base: "column", lg: "row" }}>
            <InputText
              name="email"
              placeholder="Email"
              help="Ingresar correo"
            />
          </Stack>
          <Button
            title="Actualizar datos"
            type="submit"
            bgGradient="blue"
            colorScheme="blue"
          />
        </Form>
      )}
    </Formik>
  );
};

export default ProfileUpdateForm;
