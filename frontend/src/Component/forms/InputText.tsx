import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  ListItem,
  NumberInput,
  NumberInputField,
  UnorderedList,
} from "@chakra-ui/react";
import { useField } from "formik";

export interface InputProps {
  name: string;
  help?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  [x: string]: any;
}

const InputText = ({ label, help, ...props }: InputProps) => {
  const [field, meta] = useField(props);
  const { value, ...fieldRest } = field;

  return (
    <FormControl isInvalid={!!meta.error && meta.touched}>
      <FormLabel>{label || props.placeholder || field.name}</FormLabel>
      {props.type === "number" ? (
        <NumberInput variant="filled" value={value || ""} {...props}>
          <NumberInputField {...fieldRest} />
        </NumberInput>
      ) : (
        <Input variant="filled" value={value || ""} {...fieldRest} {...props} />
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

export default InputText;
