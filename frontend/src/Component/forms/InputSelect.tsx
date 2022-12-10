import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  ListItem,
  Select,
  UnorderedList,
} from '@chakra-ui/react';
import { useField } from 'formik';

export interface InputProps {
  name: string;
  help?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  options: { name: string; value: string }[];
  [x: string]: any;
}

const InputSelect = ({ label, help, options, ...props }: InputProps) => {
  const [field, meta] = useField(props);
  const { value, ...fieldRest } = field;

  return (
    <FormControl isInvalid={!!meta.error && meta.touched}>
      <FormLabel>{label || props.placeholder || field.name}</FormLabel>

      <Select variant="filled" value={value || ''} {...fieldRest} {...props}>
        {options.map((op) => (
          <option value={op.value} key={op.value}>
            {op.name}
          </option>
        ))}
      </Select>

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

export default InputSelect;
