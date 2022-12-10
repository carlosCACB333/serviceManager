import { Box, Heading, useTheme } from '@chakra-ui/react';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { charOption, monthLabel } from '../../helpers/drawChart';
import { Card } from '../utils/Card';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DataInterface {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
    tension: number;
    pointRadius: number;
  }[];
}

interface Props {
  report: { [x: number]: number };
  title?: string;
  color?: string;
}

const SalesChar = ({ report, title = 'Reporte', color = '' }: Props) => {
  const [data, setData] = useState<DataInterface>();
  const theme = useTheme();

  useEffect(() => {
    setData({
      labels: monthLabel,
      datasets: [
        {
          label: '  total  ',
          data: monthLabel.map((month, idx) => report[idx + 1] ?? 0),
          borderColor: color ? color : theme.colors.blue[500],
          backgroundColor: color ? color : theme.colors.blue[500],
          borderWidth: 4,
          tension: 0.4,
          pointRadius: 5,
        },
      ],
    });
  }, [report, theme.colors.blue, color]);

  return (
    <Card w="full" h="full">
      <Heading size="md" mb="1">
        {title}
      </Heading>
      <Box>{data && <Line options={charOption} data={data} />}</Box>
    </Card>
  );
};

export default SalesChar;
