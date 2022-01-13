import InputText from "../forms/InputText";
import Search from "../forms/Search";

interface Props {
  base_name?: string;
  editable?: boolean;
  search?: boolean;
}

const ClientForm = ({
  base_name = "",
  editable = true,
  search = false,
}: Props) => {
  return (
    <>
      {search ? (
        <Search
          name={base_name + "first_name"}
          label="Nombres"
          placeholder="Nombres completos"
          disabled={!editable}
        />
      ) : (
        <InputText
          name={base_name + "first_name"}
          label="Nombres"
          placeholder="Nombres completos"
          disabled={!editable}
        />
      )}
      <InputText
        name={base_name + "last_name"}
        label="Apellidos"
        placeholder="Apellidos completos"
        disabled={!editable}
      />
      <InputText
        name={base_name + "address"}
        label="Dirección"
        placeholder="Dirección"
        disabled={!editable}
      />
      <InputText
        name={base_name + "reference"}
        label="Referencia"
        placeholder="Referencia"
        disabled={!editable}
      />
      <InputText
        name={base_name + "email"}
        label="Correo"
        placeholder="Correo"
        disabled={!editable}
      />
      <InputText
        name={base_name + "company"}
        label="Empresa"
        placeholder="Empresa"
        disabled={!editable}
      />
      <InputText
        name={base_name + "phone"}
        label="Teléfono"
        placeholder="Teléfono"
        disabled={!editable}
      />
    </>
  );
};

export default ClientForm;
