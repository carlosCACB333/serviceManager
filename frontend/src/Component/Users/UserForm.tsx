import { Stack } from '@chakra-ui/react';
import InputSelect from '../forms/InputSelect';
import InputText from '../forms/InputText';

const UserForm = () => {
  return (
    <>
      <InputText name="username" placeholder="Username" help="Ingrese su nomobre de usuario" />

      <Stack direction={{ base: 'column', lg: 'row' }}>
        <InputText type="password" name="password" placeholder="Password" help="Mínimo 8 caracteres" />
        <InputText type="password" name="password2" placeholder="confirmar contraseña" help="Confirmar contraseña" />
      </Stack>

      <Stack direction={{ base: 'column', lg: 'row' }}>
        <InputText name="first_name" label="Nombres" placeholder="Nombres" help="Ingrese sus nombres" />
        <InputText name="last_name" label="Apellidos" placeholder="Apellidos" help="Ingrese sus Apellidos" />
      </Stack>

      <Stack direction={{ base: 'column', lg: 'row' }}>
        <InputText name="email" placeholder="Email" help="Ingresar correo" />
        <InputSelect
          name="rol"
          placeholder="Seleccione un cargo ..."
          label="Cargo"
          help="Cargo del usuario"
          options={[
            { name: 'Administrador', value: 'Admin' },
            { name: 'Vendedor', value: 'Seller' },
          ]}
        />
      </Stack>
    </>
  );
};

export default UserForm;
