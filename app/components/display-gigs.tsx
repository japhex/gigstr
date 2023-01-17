import { useQuery } from '@apollo/react-hooks'
import { Grid } from '@chakra-ui/react'
import Card from '@components/gig/card'
import QueryHandler from '@components/query-handler'
import { GigsDocument, GigsQuery } from '@gql/graphql'

const Gigs = () => {
  const { loading, error, data } = useQuery<GigsQuery>(GigsDocument)
  const gigs = data?.gigs || []

  if (loading || error) return <QueryHandler loading={loading} error={error} />

  return (
    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr 1fr' }} gridGap={6} w="100%">
      {gigs?.length > 0 ? (
        gigs?.map(gig => <Card gig={gig} />)
      ) : (
        <>you haven't added any gigs yet, try searching for some!</>
      )}
    </Grid>
  )
}

export default Gigs
