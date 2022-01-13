export interface AuthInterface {
  token: string;
  user: UserInterface;
  checking: boolean;
}

export interface UserInterface {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  id: number;
}
