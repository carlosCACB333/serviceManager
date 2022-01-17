import axios from "axios";
import { Dispatch } from "react";
import { UserAction } from "../reducers/userReducer";
import { UserInterface } from "../interfaces/userInterfaces";
import { FormikHelpers } from "formik";
import { UseToastOptions } from "@chakra-ui/react";

export const startGetUserAll = () => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return (dispatch: Dispatch<UserAction>) => {
    axios
      .get("auth/user/", {
        headers: { Authorization: TOKEN },
      })
      .then((res) => {
        dispatch({ type: "userGetAll", payload: res.data.results });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const startAddUser = (
  data: UserInterface,
  action: FormikHelpers<UserInterface>,
  toast: (prop: UseToastOptions) => void
) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return (dispatch: Dispatch<UserAction>) => {
    axios
      .post("auth/user/", data, {
        headers: { Authorization: TOKEN },
      })
      .then((res) => {
        toast({
          isClosable: true,
          status: "success",
          title: "Registrado",
          description: "El usuario se registró correctamente",
          position: "top-end",
        });

        dispatch({ type: "userAdd", payload: res.data });
        action.resetForm();
      })
      .catch((err) => {
        action.setErrors(err.response.data);
      });
  };
};

export const startUpdateUser = (
  data: UserInterface,
  action: FormikHelpers<UserInterface>,
  toast: (prop: UseToastOptions) => void
) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return (dispatch: Dispatch<UserAction>) => {
    axios
      .put(
        "auth/user/" + data.id + "/",
        { ...data, password: data.password ? data.password : undefined },
        {
          headers: { Authorization: TOKEN },
        }
      )
      .then((res) => {
        toast({
          isClosable: true,
          status: "success",
          title: "Actualizado",
          description: "El usuario se actualizó correctamente",
          position: "top-end",
        });

        action.resetForm();
        dispatch({ type: "userUpdate", payload: res.data });
      })
      .catch((err) => {
        action.setErrors(err.response.data);
      });
  };
};

export const startDeleteUser = (
  id: number,
  toast: (prop: UseToastOptions) => void
) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return (dispatch: Dispatch<UserAction>) => {
    axios
      .delete("auth/user/" + id + "/", {
        headers: { Authorization: TOKEN },
      })
      .then((res) => {
        toast({
          isClosable: true,
          status: "success",
          title: "Eliminado",
          description: "El usuario se eliminó correctamente",
          position: "top-end",
        });
        dispatch({ type: "userDelete", payload: id });
      })
      .catch((err) => {
        console.log(err.response);
        toast({
          isClosable: true,
          status: "error",
          title: "Error",
          description: err.response.data.msg,
          position: "top-end",
        });
      });
  };
};
export const startUserSetActive = (id: number) => {
  const TOKEN = `token ${localStorage.getItem("token")}`;
  return (dispatch: Dispatch<UserAction>) => {
    axios
      .post("auth/toogleActive/" + id, null, {
        headers: { Authorization: TOKEN },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: "userSetActive",
          payload: { id: res.data.id, checked: res.data.is_active },
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
