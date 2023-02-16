import { KeyboardEvent, useContext, useEffect, useMemo, useRef, useState } from 'react'

import { useLazyQuery } from '@apollo/react-hooks'
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Grid,
  Input,
  InputRightElement,
  InputGroup,
  Fade,
  Spinner,
} from '@chakra-ui/react'
import GigResult from '@components/search-result'
import Title from '@components/ui/title'
import { AppContext } from '@context/app/context'
import { Gig, SearchGigDocument, SearchGigQuery } from '@gql/graphql'
import { SHADOWS } from '@theme/utils/shadows'
import { useForm } from 'react-hook-form'
import { MdSearch } from 'react-icons/md'

import useInView from '../hooks/useInView'

type FormValues = {
  artist: string
}

const Search = () => {
  const lastMessageRef = useRef(null)
  const { searchActive, setSearchActive, setSearchLoading } = useContext(AppContext)
  const [noMoreResults, setNoMoreResults] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const { register, handleSubmit, getValues, setValue, resetField } = useForm<FormValues>()
  const [searchGigAction, { data, loading, fetchMore }] = useLazyQuery<SearchGigQuery>(SearchGigDocument)
  const lastMessageInView = useInView(lastMessageRef, {
    root: null,
    rootMargin: '100px',
    threshold: 1,
  })
  const gigs = useMemo(() => data?.searchGig || [], [data])

  const onSubmit = async (variables: FormValues) => {
    await searchGigAction({
      variables: { ...variables, type: 'Ticketmaster' },
    })
    setSearchActive(true)
  }

  const onKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setValue('artist', '')
      resetField('artist')
    }
    if ((e.target as HTMLInputElement).value === '') {
      setSearchActive(false)
    }
  }

  useEffect(() => {
    setSearchLoading(loading)
  }, [loading])

  useEffect(() => {
    const getNewMessages = async () => {
      if (lastMessageInView && !noMoreResults) {
        await fetchMore({
          variables: { page, artist: getValues('artist') },
          updateQuery: (prev, { fetchMoreResult }) => {
            const nextGigs = fetchMoreResult?.searchGig || []
            setNoMoreResults(nextGigs?.length < 20 || nextGigs?.length === 0)
            return {
              searchGig: [...(prev?.searchGig || []), ...nextGigs],
            }
          },
        })
        setPage(page + 1)
      }
    }
    getNewMessages()
  }, [lastMessageInView, noMoreResults, fetchMore, gigs])

  return (
    <>
      <Box position="sticky" top={4} ml="auto" zIndex="1" boxShadow={SHADOWS.default} w={{ base: '100%', md: '50%' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap={4} bg="GREY3" p={8}>
            <Flex w="30%">
              <Title title="gig search" filter={false} />
            </Flex>
            <FormControl>
              <Center h="100%">
                <InputGroup size="md">
                  <Input placeholder="Artist name..." {...register('artist')} onKeyUp={onKeyup} />
                  <InputRightElement>
                    <Button aria-label="search" isLoading={loading} type="submit" variant="with-input">
                      <MdSearch size="25px" />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Center>
            </FormControl>
          </Flex>
        </form>
      </Box>
      {data && !loading && searchActive && (
        <Box>
          <Fade in={data && !loading && searchActive}>
            <Box bg="GREY4">
              <Grid templateColumns={{ base: '1fr', md: 'repeat(5, minmax(0, 1fr))' }} gap={4} py={4} autoRows="1fr">
                {data?.searchGig?.map((gig: Gig, index: number) => (
                  <Box ref={index === data?.searchGig.length - 1 ? lastMessageRef : null}>
                    <GigResult gig={gig} key={gig._id} setValue={setValue} />
                  </Box>
                ))}
                {/* MAYBE FULL SCREEN LOADER THAT BLOCKS UI? */}
                {loading && <Spinner />}
                {!data.searchGig && <>No gigs found for {getValues('artist')}! Maybe they're taking a break!?</>}
              </Grid>
            </Box>
          </Fade>
        </Box>
      )}
    </>
  )
}

export default Search
