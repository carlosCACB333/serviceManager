import axios from "axios";
import React, { createContext, useCallback, useState } from "react";
import { AuthInterface, UserInterface } from "../interfaces/authInterface";

const initial = {
  token: "",
  user: {} as UserInterface,
  checking: true,
};
interface ContextInterface {
  auth: AuthInterface;
  checkToken: () => void;
  setAuth: React.Dispatch<React.SetStateAction<typeof initial>>;
  authLogout: () => void;
}
export const AuthContext = createContext<ContextInterface>(undefined!);

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [auth, setAuth] = useState(initial);

  const checkToken = useCallback(() => {
    setAuth((state) => ({ ...state, checking: true }));
    axios
      .post("http://127.0.0.1:8000/api/auth/checkToken", null, {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setAuth({
          checking: false,
          user: resp.data.user,
          token: resp.data.token,
        });
      })
      .catch((err) => {
        setAuth((state) => ({ ...state, checking: false }));
      });
  }, []);

  const authLogout = useCallback(() => {
    setAuth({ ...initial, checking: false });
    localStorage.removeItem("token");
  }, []);

  return (
    <AuthContext.Provider value={{ auth, checkToken, setAuth, authLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
