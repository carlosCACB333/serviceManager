import * as yup from 'yup';

const msgRequered = 'Este campo es requerido';

export const loginValidator = yup.object({
  username: yup.string().required(msgRequered),
  password: yup.string().required(msgRequered),
});
export const changePasswordValidator = yup.object({
  password: yup.string().required(msgRequered).min(8, 'Este campo es muy pequeño'),
  password1: yup.string().required(msgRequered).min(8, 'Este campo es muy pequeño'),
  password2: yup
    .string()
    .required(msgRequered)
    .min(8, 'Este campo es muy pequeño')
    .oneOf([yup.ref('password1')], 'Las contraseñas no coinciden'),
});

const userBaseValidator = {
  username: yup.string().required(msgRequered),
  first_name: yup.string().required(msgRequered),
  last_name: yup.string().required(msgRequered),
  email: yup.string().required(msgRequered).email('El email no es válido'),
  rol: yup.string().required(msgRequered),
};

export const userAddValidator = yup.object({
  ...userBaseValidator,
  password: yup.string().required(msgRequered).min(8, 'Este campo es muy pequeño'),
  password2: yup
    .string()
    .required(msgRequered)
    .min(8, 'Este campo es muy pequeño')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
});
export const userUpdateValidator = yup.object({
  ...userBaseValidator,
  password: yup.string().min(8, 'Este campo es muy pequeño'),
  password2: yup
    .string()
    .min(8, 'Este campo es muy pequeño')
    .when('password', {
      is: (value: string) => (value ? true : false),
      then: (schema) => schema.required(msgRequered).oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
    }),
});

export const clientValidator = yup.object({
  first_name: yup.string().required(msgRequered),
  last_name: yup.string().required(msgRequered),
  address: yup.string(),
  reference: yup.string(),
  email: yup.string(),
  company: yup.string(),
  phone: yup.string(),
});

const ServiceBaseValidator = {
  name: yup.string(),
  size: yup.string(),
  address: yup.string(),
  description: yup.string(),
  cost: yup.number().min(0, 'El costo debe ser positivo'),
  amount: yup.number().min(1, 'La cantidad mínima es 1'),
};

export const serviceValidator = yup.object({
  ...ServiceBaseValidator,
});
export const serviceUpdateValidator = yup.object({
  ...ServiceBaseValidator,
});

export const paymentValidator = yup.object({
  amount: yup.number().required(msgRequered).min(0, 'El adelando debe ser positivo'),
});

export const addServiceValidator = yup.object({
  client: clientValidator,
  services: serviceValidator,
  payments: paymentValidator,
  end_date: yup.date().required(msgRequered).min(new Date(), 'Esta Fecha no puede ser menor que hoy'),
});

// referencia

// end_warranty: yup
//     .date()
//     .min(
//       yup.ref("start_warranty"),
//       "Esta fecha no puede ser menor que la fecha de inicio de la Garantía "
//     )
//     .when("start_warranty", {
//       is: (value: any) => value !== undefined,
//       then: (schema) => schema.required(msgRequered),
//     })
