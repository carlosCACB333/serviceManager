import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import {
  // BrowserRouter,
  HashRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import AuthPage from "../page/AuthPage";
import HomePage from "../page/HomePage";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../Component/utils/Loading";
import SideBar from "./SideBar";
import ServiceAddPage from "../page/ServiceAddPage";
import ServiceListPage from "../page/ServiceListPage";
import NavBar from "./NavBar";
import { VStack } from "@chakra-ui/layout";
import ServiceDetailPage from "../page/ServiceDetailPage";
import ClientListPage from "../page/ClientListPage";
import ProfilePage from "../page/ProfilePage";
import ProfileUserPage from "../page/ProfileUserPage";
import NotFound from "../Component/utils/NotFound";
import UserPage from "../page/UserPage";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Forbidden from "../Component/utils/Forbidden";
import Unauthorized from "../Component/utils/Unauthorized";

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
  const [isLarge] = useMediaQuery("(min-width: 62em)");
  const [show, setShow] = useState(isLarge);
  return (
    <Flex gap="1">
      {show && <SideBar />}
      <VStack className="scroll" h="100vh" flex="1" overflowX="hidden" me={2}>
        <NavBar setShow={setShow} />
        <Outlet />
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

  return user.rol === "Admin" ? children : <Navigate to="forbidden" />;
};

export default AppRouter;
