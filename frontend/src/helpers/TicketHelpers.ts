import { TicketInterface } from "../interfaces/serviceInterface";

export const getStatsTicket = (ticket: TicketInterface) => {
  let costo = 0;
  let cantidad = 0;
  let adelanto = 0;
  ticket.services.forEach((serv) => {
    cantidad += serv.amount;
    costo += serv.amount * Number(serv.cost);
  });

  ticket.payments.forEach((adv) => {
    adelanto += Number(adv.amount);
  });

  let estado = costo - adelanto;

  return { cantidad, costo, adelanto, estado };
};
