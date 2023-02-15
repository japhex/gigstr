import { useQuery } from '@apollo/react-hooks'
import { Box, Flex } from '@chakra-ui/react'
import PastCard from '@components/gig/past-card'
import QueryHandler from '@components/ui/query-handler'
import Title from '@components/ui/title'
import { GigsDocument, GigsQuery } from '@gql/graphql'

const PastGigs = () => {
  const { loading, error, data } = useQuery<GigsQuery>(GigsDocument, {
    variables: { past: true },
  })
  const gigs = data?.gigs || []

  return (
    <>
      <Title title="past gigs" past filter={gigs.length > 0} />
      <Box w="100%" overflowX="scroll">
        <Flex gap={4} w="100%">
          {loading || error ? (
            <QueryHandler loaderStyle="thin" loading={loading} error={error} />
          ) : gigs?.length > 0 ? (
            gigs.map(gig => <PastCard key={gig?._id} gig={gig || {}} />)
          ) : (
            <>You haven't been to any gigs yet!</>
          )}
        </Flex>
      </Box>
    </>
  )
}

export default PastGigs
