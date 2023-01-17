import { Request } from 'express'

export interface RequestWithProps extends Request {
  user: string
}

export enum API {
  TICKET_MASTER = 'Ticketmaster',
  BANDS_IN_TOWN = 'BandsInTown',
}
