import { MomentInput } from "moment";

export interface UserInterface {
  id: number;
  username: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  email: string;
  rol: string;
  last_login: MomentInput | Date;
  is_active: boolean;
  date_joined: MomentInput | Date;
}

export const UserInit: UserInterface = {
  id: -1,
  username: "",
  password: "",
  password2: "",
  first_name: "",
  last_name: "",
  email: "",
  rol: "",
  last_login: undefined,
  is_active: true,
  date_joined: undefined,
};

export interface ChangePassInterface {
  password: string;
  password1: string;
  password2: string;
}
