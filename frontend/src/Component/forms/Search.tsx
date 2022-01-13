import {
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import {
  ClientInterface,
  TicketInterface,
} from "../../interfaces/serviceInterface";
import { getClientsAllApi } from "../../helpers/api";
import { SideBarItem } from "./../../routers/SideBar";
import { FaSearchPlus } from "react-icons/fa";

export interface InputProps {
  name: string;
  help?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  [x: string]: any;
}

const Search = ({ label, help, ...props }: InputProps) => {
  const [field, meta] = useField(props);
  const { value, ...fieldRest } = field;

  const [clients, setClients] = useState<ClientInterface[]>([]);

  const {
    values: { client },
  } = useFormikContext<TicketInterface>();

  useEffect(() => {
    if (client.first_name.length > 0 && client.id === undefined) {
      const url = "auth/client/?search=" + client.first_name;
      getClientsAllApi(url)
        .then((res) => setClients(res.data.results))
        .catch((err) => console.log(err.response));
    } else {
      setClients([]);
    }
  }, [client.first_name, client.id]);

  return (
    <FormControl isInvalid={!!meta.error && meta.touched} position="relative">
      <FormLabel>{label || props.placeholder || field.name}</FormLabel>
      <Input
        autoComplete="none"
        variant="filled"
        value={value || ""}
        {...fieldRest}
        {...props}
      />

      {clients.length > 0 && (
        <Flex
          position="absolute"
          direction="column"
          bg="gray.900"
          zIndex={200}
          border="1px solid"
          rounded="xl"
          w="full"
          p={1}
        >
          <CloseButton alignSelf="end" onClick={() => setClients([])} />
          <Flex direction="column" maxH={350} className="scroll">
            {clients.map((client) => (
              <SideBarItem
                name={client.first_name + " " + client.last_name}
                url={"/service/add/" + client.id}
                icon={FaSearchPlus}
                key={client.id}
              />
            ))}
          </Flex>
        </Flex>
      )}
      {meta.error && meta.touched ? (
        <FormErrorMessage>
          {Array.isArray(meta.error) ? (
            <UnorderedList>
              {meta.error.map((err, key) => (
                <ListItem key={key}>{err}</ListItem>
              ))}
            </UnorderedList>
          ) : (
            meta.error
          )}
        </FormErrorMessage>
      ) : (
        <FormHelperText>{help} </FormHelperText>
      )}
    </FormControl>
  );
};

export default Search;
