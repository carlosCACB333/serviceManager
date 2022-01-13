import { useContext, useState } from "react";
import { Box, Flex, Grid, GridItem, List, Text } from "@chakra-ui/react";
import { Card } from "../Component/utils/Card";

import BackgroundProfile from "../Component/auth/BacgroundProfile";
import ProfeItem from "../Component/auth/ProfileItem";
import { AuthContext } from "../contexts/AuthContext";

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
        name={user.username}
        email={user.email}
      />
      <Grid templateColumns="repeat(12,1fr)" gap="2">
        <GridItem colSpan={{ base: 12, lg: 6, xl: 4, "2xl": 3 }}>
          <Card>
            <Box p="12px 5px" mb="12px">
              <Text fontSize="lg" fontWeight="bold">
                Datos personales
              </Text>
            </Box>
            <Box px="5px">
              <Box mb="12px">
                <List spacing={3}>
                  <ProfeItem name="Nombre" value={user.first_name} />
                  <ProfeItem name="Apellido" value={user.last_name} />
                  <ProfeItem name="Username" value={user.username} />
                </List>
              </Box>
            </Box>
          </Card>
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 6, xl: 8, "2xl": 9 }}>
          <Card className="scroll" overscrollX="auto">
            <></>
          </Card>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default ProfileUserPage;
