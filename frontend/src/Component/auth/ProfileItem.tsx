import { ListIcon, ListItem, Text } from "@chakra-ui/react";
import { FaLongArrowAltRight } from "react-icons/fa";

const ProfeItem = ({ name, value }: { name: string; value: string }) => {
  return (
    <ListItem>
      <ListIcon as={FaLongArrowAltRight} color="blue.500" />
      <Text color="gray.500" fontWeight="bold" d="inline">
        {name}
      </Text>
      &nbsp;
      <Text color="gray.500" d="inline">
        {value}
      </Text>
    </ListItem>
  );
};

export default ProfeItem;
