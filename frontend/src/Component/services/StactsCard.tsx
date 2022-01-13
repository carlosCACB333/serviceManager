import {
  Flex,
  Stat,
  StatLabel,
  Box,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  stat: number | string;
  icon: ReactNode;
  [x: string]: any;
}
function StatsCard(props: StatsCardProps) {
  const { title = "", stat = "", icon, ...rest } = props;
  return (
    <Stat {...rest}>
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"extrabold"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"extrabold"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          ms="1"
          bg={useColorModeValue("gray.100", "blue.600")}
          p={3}
          rounded="xl"
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default StatsCard;
