import moment from 'moment';
import { TicketInterface } from '../interfaces/serviceInterface';

export const getStatsTicket = (ticket: TicketInterface) => {
  let costo = 0;
  let cantidad = ticket.services.length;
  let adelanto = 0;
  ticket.services.forEach((serv) => {
    costo += serv.amount * Number(serv.cost);
  });

  ticket.payments.forEach((adv) => {
    adelanto += Number(adv.amount);
  });

  let estado = costo - adelanto;

  return { cantidad, costo, adelanto, estado };
};

export const getProgessBarValue = (first: Date | moment.MomentInput, last: Date | moment.MomentInput) => {
  const diff = moment(last).diff(moment(first));
  const advance = moment().diff(moment(first));
  const resp = (advance / diff) * 100;

  if (resp > 100) {
    return 100;
  }
  return resp;
};
