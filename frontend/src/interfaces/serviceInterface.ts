import { MomentInput } from 'moment';

export interface TicketInterface {
  id: number;
  client: ClientInterface;
  user?: UserSerializer;
  services: ServiceInterface[];
  payments: PaymentInterface[];
  is_closed?: boolean;
  date?: Date | MomentInput;
  end_date: Date | MomentInput;
  finish_date?: Date | MomentInput;
  start_warranty?: Date | MomentInput;
  end_warranty?: Date | MomentInput;
}

export interface PaymentInterface {
  id: number;
  amount: string;
  date?: Date;
  detail: string;
  ticket?: number;
}

export interface ClientInterface {
  id?: number;
  first_name: string;
  last_name: string;
  address: string;
  reference: string;
  email: string;
  company: string;
  phone: string;
  score?: number;
  non_field_errors?: any;
}

export interface ServiceInterface {
  id: number;
  name: string;
  size: string;
  address: string;
  description: string;
  cost: string;
  amount: number;
  ticket?: number;
}

export interface UserSerializer {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  id: number;
}
