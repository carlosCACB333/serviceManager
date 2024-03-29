import { VStack } from '@chakra-ui/layout';
import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import {
  // BrowserRouter,
  HashRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import Forbidden from '../Component/utils/Forbidden';
import Loading from '../Component/utils/Loading';
import NotFound from '../Component/utils/NotFound';
import Unauthorized from '../Component/utils/Unauthorized';
import { AuthContext } from '../contexts/AuthContext';
import AuthPage from '../page/AuthPage';
import ClientListPage from '../page/ClientListPage';
import HomePage from '../page/HomePage';
import ProfilePage from '../page/ProfilePage';
import ProfileUserPage from '../page/ProfileUserPage';
import ServiceAddPage from '../page/ServiceAddPage';
import ServiceDetailPage from '../page/ServiceDetailPage';
import ServiceListPage from '../page/ServiceListPage';
import UserPage from '../page/UserPage';
import { store } from '../store/store';
import NavBar from './NavBar';
import SideBar from './SideBar';

const AppRouter = () => {
  const { auth, checkToken } = useContext(AuthContext);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  if (auth.checking) {
    return <Loading />;
  }
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <Private>
              <Provider store={store}>
                <HomeLayout />
              </Provider>
            </Private>
          }
        >
          <Route
            path="/*"
            element={
              <AdminUser>
                <Outlet />
              </AdminUser>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="users" element={<UserPage />} />
          </Route>

          <Route path="service/add" element={<ServiceAddPage />} />
          <Route path="service/add/:id" element={<ServiceAddPage />} />
          <Route path="service/list" element={<ServiceListPage />} />
          <Route path="ticket/:id" element={<ServiceDetailPage />} />
          <Route path="client" element={<ClientListPage />} />
          <Route path="profile" element={<ProfileUserPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />

          <Route path="forbidden" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="auth/*"
          element={
            <Public>
              <Box>
                <Outlet />
              </Box>
            </Public>
          }
        >
          <Route path="login" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="signup" element={<AuthPage />} /> */}
        </Route>
        <Route path="unauthorized" element={<Unauthorized />} />
      </Routes>
    </HashRouter>
  );
};

const HomeLayout = () => {
  const [isLarge] = useMediaQuery('(min-width: 62em)');
  const [show, setShow] = useState(isLarge);
  return (
    <Flex gap="1">
      {show && <SideBar setShow={setShow} />}
      <VStack h="100vh" flex="1" overflowX="hidden" spacing={0}>
        <NavBar setShow={setShow} />
        <VStack className="scroll" w="full" px={2}>
          <Outlet />
        </VStack>
      </VStack>
    </Flex>
  );
};

const Private = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  return !auth?.auth.token ? <Navigate to="auth/login" /> : children;
};

const Public = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  return auth?.auth.token ? <Navigate to="/" /> : children;
};

const AdminUser = ({ children }: { children: JSX.Element }) => {
  const {
    auth: { user },
  } = useContext(AuthContext);

  return user.rol === 'Admin' ? children : <Navigate to="forbidden" />;
};

export default AppRouter;
