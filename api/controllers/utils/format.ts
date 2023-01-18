const sortedImages = data =>
  data?._embedded?.events[0]?.images?.sort((a, b) => {
    return a.width > b.width ? -1 : 1
  }) || []

export const formatTicketmasterArtistData = async data => {
  const images = sortedImages(data)

  return {
    name: data?._embedded?.events[0]?.name || '',
    image: images[0]?.url || '',
    genre:
      data?._embedded?.events[0]?.classifications[0]?.genre?.name === 'Undefined'
        ? ''
        : data?._embedded?.events[0]?.classifications[0]?.genre?.name,
    subGenre:
      data?._embedded?.events[0]?.classifications[0]?.subGenre?.name === 'Undefined'
        ? ''
        : data?._embedded?.events[0]?.classifications[0]?.subGenre?.name,
  }
}

export const formatTicketmasterGigData = (artist, event, gigIds) => ({
  id: event?.id,
  ticketmasterId: event?.id,
  artist,
  date: {
    start: event?.dates?.start?.localDate || event?.dates?.start?.dateTime,
    end: event?.dates?.end?.localDate || event?.dates?.end?.dateTime,
  },
  info: `${event?.info} ${event?.pleaseNote}`,
  ...(event?._embedded?.venues && {
    venue: {
      location: event?._embedded?.venues[0]?.location,
      name: event?._embedded?.venues[0]?.name,
      city: event?._embedded?.venues[0]?.city?.name,
      country: event?._embedded?.venues[0]?.country?.name,
    },
  }),
  lineup: event?._embedded?.attractions?.slice(0, 10).map(support => ({
    name: support?.name,
    image: support?.images[0]?.url,
    genre: support?.classifications[0]?.genre?.name,
    subGenre: support?.classifications[0]?.subGenre?.name,
  })),
  festival: {
    start_date: event?.festival_start_date || '',
    end_date: event?.festival_end_date || '',
  },
  attending: gigIds.includes(event?.id),
})
