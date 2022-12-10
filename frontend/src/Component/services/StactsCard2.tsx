import { Box, Divider, Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  stat: number | string;
  icon: ReactNode;
  [x: string]: any;
}
function StatsCard2(props: StatsCardProps) {
  const { title = '', stat = '', icon, ...rest } = props;
  return (
    <Stat rounded="lg" textAlign="center" alignItems="center" {...rest}>
      <Box w="fit-content" bg={useColorModeValue('gray.100', 'blue.600')} p={3} rounded="xl" mx="auto">
        {icon}
      </Box>
      <StatLabel fontWeight={'medium'} my="3">
        {title}
      </StatLabel>
      <Divider />
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

export default StatsCard2;
