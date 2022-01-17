import { Box, Heading, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik, FormikValues } from "formik";
import { Link } from "react-router-dom";
import Button from "../forms/Button";
import InputText from "../forms/InputText";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { userAddValidator } from "../../validators/formValidator";
const baseURL = process.env.REACT_APP_API_URL + "/api";
const Signup = () => {
  const { setAuth } = useContext(AuthContext);
  const toast = useToast();
  const initialValues = {
    username: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    email: "",
    non_field_errors: "",
  };
  const handleSubmit = (
    values: FormikValues,
    { setErrors }: { setErrors: (val: typeof initialValues) => void }
  ) => {
    axios
      .post(baseURL + "/auth/signup", values)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setAuth((state) => ({ ...state, ...res.data }));
      })
      .catch((err) => {
        if (err.response.data.non_field_errors) {
          toast({
            title: "Error",
            description: err.response.data.non_field_errors,
            status: "error",
            position: "top-end",
            duration: 3000,
            isClosable: true,
          });
        } else {
          setErrors(err.response.data);
        }
      });
  };

  return (
    <Box>
      <Heading mb="2">Registrarse</Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={userAddValidator}
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
                type="password"
                name="password"
                placeholder="Password"
                help="La contraseña debe contener letras y números.mínimo 8 caracteres"
              />
              <InputText
                type="password"
                name="password2"
                placeholder="confirmar contraseña"
                help="Confirmar contraseña"
              />
            </Stack>

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

            <InputText
              name="email"
              placeholder="Email"
              help="Ingresar correo"
            />
            <Button title="Crear cuenta" type="submit" />
            <Link to="/auth/login">
              <Button title="iniciar sesión" variant="link" bgGradient="" />
            </Link>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Signup;
