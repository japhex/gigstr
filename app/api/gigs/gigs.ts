import gql from 'graphql-tag'

export const getGigs = gql`
  query gigs($past: Boolean) {
    gigs(past: $past) {
      _id
      artist
      date
      info
      venue
      lineup
      festival
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
      artist
      date
      info
      venue
      lineup
      festival
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

// export const getGigsFilteredByFestival = gql`
//   query gigsFestivalFilter {
//     gigsFestivalFilter {
//       id
//       artist
//       date
//       venue
//       lineup
//       festival
//     }
//   }
// `
//
// export const getGigsFilteredByMonth = gql`
//   query gigsMonthFilter($month: Int!) {
//     gigsMonthFilter(month: $month) {
//       id
//       artist
//       date
//       venue
//       lineup
//       festival
//     }
//   }
// `
//
// export const getGigsFilteredByYear = gql`
//   query gigsYearFilter($year: Int!) {
//     gigsYearFilter(year: $year) {
//       id
//       artist
//       date
//       venue
//       lineup
//       festival
//     }
//   }
// `
//
// export const getGigsUnfiltered = gql`
//   query gigsUnfiltered {
//     gigsUnfiltered {
//       id
//       artist
//       date
//       venue
//       lineup
//       festival
//     }
//   }
// `
