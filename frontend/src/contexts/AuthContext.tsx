import axios from 'axios';
import React, { createContext, useCallback, useState } from 'react';
import { AuthInterface } from '../interfaces/authInterface';
import { UserInterface } from '../interfaces/userInterfaces';
const baseURL = process.env.REACT_APP_API_URL + '/api';

const initial = {
  token: '',
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
      .post(baseURL + '/auth/checkToken', null, {
        headers: {
          Authorization: `token ${localStorage.getItem('token')}`,
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
    localStorage.removeItem('token');
  }, []);

  return <AuthContext.Provider value={{ auth, checkToken, setAuth, authLogout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
