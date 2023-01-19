import gql from 'graphql-tag'

export const getGigs = gql`
  query gigs($past: Boolean) {
    gigs(past: $past) {
      _id
      artist {
        name
        image
        genre
        subGenre
      }
      date {
        start
        end
      }
      info
      venue {
        location
        name
        latitude
        longitude
        city
        country
      }
      lineup {
        name
        image
        genre
        subGenre
      }
      festival {
        start_date
        end_date
      }
      ratings
    }
  }
`

export const createGigMutation = gql`
  mutation createGig(
    $id: String!
    $ticketmasterId: String!
    $artist: JSONObject
    $date: JSONObject
    $info: String
    $venue: JSONObject
    $lineup: [JSONObject]
    $festival: JSONObject
  ) {
    createGig(
      id: $id
      ticketmasterId: $ticketmasterId
      artist: $artist
      date: $date
      info: $info
      venue: $venue
      lineup: $lineup
      festival: $festival
    ) {
      _id
      artist {
        name
        image
        genre
        subGenre
      }
      date {
        start
        end
      }
      info
      venue {
        location
        name
        latitude
        longitude
        city
        country
      }
      lineup {
        name
        image
        genre
        subGenre
      }
      festival {
        start_date
        end_date
      }
    }
  }
`

export const deleteGigMutation = gql`
  mutation deleteGig($id: ID!) {
    deleteGig(id: $id)
  }
`

export const searchGigQuery = gql`
  query searchGig($artist: String!, $date: String) {
    searchGig(artist: $artist, date: $date)
  }
`

export const getGigsFilteredByDate = gql`
  query filterGigsByDate($month: String, $year: String) {
    filterGigsByDate(month: $month, year: $year) {
      _id
      artist {
        name
        image
        genre
        subGenre
      }
      date {
        start
        end
      }
      info
      venue {
        location
        name
        latitude
        longitude
        city
        country
      }
      lineup {
        name
        image
        genre
        subGenre
      }
      festival {
        start_date
        end_date
      }
    }
  }
`

export const getGigsFilteredByProperty = gql`
  query filterGigsByProperty($filters: JSONObject!) {
    filterGigsByProperty(filters: $filters) {
      _id
      artist {
        name
        image
        genre
        subGenre
      }
      date {
        start
        end
      }
      info
      venue {
        location
        name
        latitude
        longitude
        city
        country
      }
      lineup {
        name
        image
        genre
        subGenre
      }
      festival {
        start_date
        end_date
      }
    }
  }
`
