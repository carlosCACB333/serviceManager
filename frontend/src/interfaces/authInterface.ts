import { UserInterface } from "./userInterfaces";

export interface AuthInterface {
  token: string;
  user: UserInterface;
  checking: boolean;
}
