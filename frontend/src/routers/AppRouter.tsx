import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import {
  BrowserRouter,
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

const AppRouter = () => {
  const { auth, checkToken } = useContext(AuthContext);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  if (auth.checking) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <Private>
              <HomeLayout />
            </Private>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="service/add" element={<ServiceAddPage />} />
          <Route path="service/add/:id" element={<ServiceAddPage />} />
          <Route path="service/list" element={<ServiceListPage />} />
          <Route path="ticket/:id" element={<ServiceDetailPage />} />
          <Route path="client" element={<ClientListPage />} />
          <Route path="profile" element={<ProfileUserPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
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
          <Route path="signup" element={<AuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
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

export default AppRouter;
