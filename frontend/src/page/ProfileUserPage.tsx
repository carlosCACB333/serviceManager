import { useContext, useState } from "react";
import { Box, Flex, List, Text } from "@chakra-ui/react";
import { Card } from "../Component/utils/Card";

import BackgroundProfile from "../Component/auth/BacgroundProfile";
import ProfeItem from "../Component/auth/ProfileItem";
import { AuthContext } from "../contexts/AuthContext";
import ProfileUpdateForm from "../Component/Users/ProfileUpdateForm";
import { FaUserEdit } from "react-icons/fa";
import ChangePassForm from "../Component/Users/ChangePassForm";

const options = [
  { value: 1, name: "Actualizar Datos", icon: FaUserEdit },
  { value: 2, name: "Actualizar contraseña", icon: FaUserEdit },
];

const ProfileUserPage = () => {
  const [btnOption, setBtnOption] = useState(1);

  const {
    auth: { user },
  } = useContext(AuthContext);

  return (
    <Flex direction="column" w="full">
      <BackgroundProfile
        setBtnOption={setBtnOption}
        btnOption={btnOption}
        name={user.first_name + " " + user.last_name}
        email={user.email}
        options={options}
      />
      <Flex gap="2" direction={{ base: "column-reverse", lg: "row" }}>
        <Card>
          <Box p="12px 5px" mb="12px">
            <Text fontSize="lg" fontWeight="bold">
              Datos personales
            </Text>
          </Box>
          <Box px="5px">
            <Box mb="12px">
              <List spacing={3}>
                <ProfeItem name="Username" value={user.username} />
                <ProfeItem name="Nombre" value={user.first_name} />
                <ProfeItem name="Apellido" value={user.last_name} />
                <ProfeItem name="Email" value={user.email} />
                <ProfeItem name="Cargo" value={user.rol} />
              </List>
            </Box>
          </Box>
        </Card>

        {/* colSpan={{ base: 12, lg: 6, xl: 4, "2xl": 3 }} */}
        <Flex flex={1} justifyContent="center">
          <Card className="scroll" overscrollX="auto">
            <>
              {btnOption === 1 && <ProfileUpdateForm user={user} />}
              {btnOption === 2 && <ChangePassForm />}
            </>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfileUserPage;
