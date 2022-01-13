import { Box, Heading, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik, FormikValues } from "formik";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { loginValidator } from "../../validators/formValidator";
import Button from "../forms/Button";
import InputText from "../forms/InputText";
const baseURL = process.env.REACT_APP_API_URL + "/api";

const Login = () => {
  const toast = useToast();
  const { setAuth } = useContext(AuthContext);

  const initialValues = {
    username: "",
    password: "",
    non_field_errors: "",
  };

  const handleSubmit = (
    values: FormikValues,
    { setErrors }: { setErrors: (val: typeof initialValues) => void }
  ) => {
    axios
      .post(baseURL + "/auth/login", values)
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
      <Heading mb="2">Login</Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={loginValidator}
      >
        {({ errors }) => (
          <Form>
            {errors.non_field_errors}
            <InputText
              name="username"
              placeholder="Username"
              help="Ingrese su nomobre de usuario"
            />
            <InputText
              type="password"
              name="password"
              placeholder="Password"
              help="Ingrese su contraseña"
            />
            <Button title="Iniciar sesión" type="submit" />
            <Link to="/auth/signup">
              <Button title="Crear cuenta" variant="link" bgGradient="" />
            </Link>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
