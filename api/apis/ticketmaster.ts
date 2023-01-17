import axios from 'axios'

export const ticketmasterApi = {
  eventSearch: async artist =>
    axios.get(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.TICKET_MASTER_API_KEY}&locale=*&keyword=${artist}&segmentName=music`
    ),
}
