import axios from 'axios'
import { formatISO } from 'date-fns'

export const ticketmasterApi = {
  eventSearch: async (artist, page = 0) =>
    axios.get(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=${
        process.env.TICKET_MASTER_API_KEY
      }&locale=*&keyword=${artist}&segmentName=music&startDateTime=${formatISO(new Date())}&sort=date,asc&page=${page}`
    ),
}
