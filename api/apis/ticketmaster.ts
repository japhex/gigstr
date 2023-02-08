import axios from 'axios'
import { formatISO } from 'date-fns'

import { getSecrets } from '../utils/aws'

export const ticketmasterApi = {
  eventSearch: async (artist, page = 0) => {
    const secrets = await getSecrets()

    return axios.get(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=${
        secrets.TICKET_MASTER_API_KEY
      }&locale=*&keyword=${artist}&segmentName=music&startDateTime=${formatISO(new Date())}&sort=date,asc&page=${page}`
    )
  },
}
