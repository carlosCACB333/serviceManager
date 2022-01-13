import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  ListItem,
  Textarea,
  UnorderedList,
} from "@chakra-ui/react";
import { useField } from "formik";

export interface InputProps {
  name: string;
  help?: string;
  label?: string;
  placeholder?: string;
  [x: string]: any;
}

const Area = ({ label, help, ...props }: InputProps) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={!!meta.error && meta.touched}>
      <FormLabel>{label || props.placeholder || field.name}</FormLabel>
      {/* <Input variant="filled" {...field} {...props} /> */}
      <Textarea variant="filled" {...field} {...props} />
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

export default Area;
