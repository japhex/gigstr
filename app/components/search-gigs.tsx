import { KeyboardEvent, useContext } from 'react'

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
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { MdSearch } from 'react-icons/md'

import { AppContext } from '../context/app/context'
import { Gig, SearchGigDocument, SearchGigQuery } from '../gql/graphql'

import GigResult from './search-result'

type FormValues = {
  artist: string
}

const Search = () => {
  const { searchActive, setSearchActive } = useContext(AppContext)
  const { register, handleSubmit, getValues, setValue } = useForm<FormValues>()
  // const [pastGig, setPastGig] = useState<boolean>(false)
  const [searchGigAction, { data, loading }] = useLazyQuery<SearchGigQuery>(SearchGigDocument)

  const onSubmit = async (variables: FormValues) => {
    await searchGigAction({
      // variables: { ...variables, type: 'Ticketmaster', ...(pastGig && { date: 'past' }) },
      variables: { ...variables, type: 'Ticketmaster' },
    })
    setSearchActive(true)
  }

  const onKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setValue('artist', '')
    }
    if ((e.target as HTMLInputElement).value === '') {
      setSearchActive(false)
    }
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={4}>
          {/* Ticketmaster API doesn't allow searching old shows..! */}
          {/*<FormControl display="flex" alignItems="center">*/}
          {/*  <FormLabel htmlFor="past" mb="0">*/}
          {/*    Past gig*/}
          {/*  </FormLabel>*/}
          {/*  <Switch ref={register('past')} id="past" onChange={e => setPastGig(e.target.checked)} />*/}
          {/*</FormControl>*/}
          <FormControl w="30%">
            <Center h="100%">
              <InputGroup size="md">
                <Input placeholder="Artist name..." {...register('artist')} onKeyUp={onKeyup} />
                <InputRightElement>
                  <Button isLoading={loading} type="submit" variant="with-input">
                    <MdSearch size="25px" />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Center>
          </FormControl>
        </Flex>
      </form>
      {data && !loading && searchActive && (
        <Fade in={data && !loading && searchActive}>
          <Box bg="GREY4">
            <Grid templateColumns="1fr 1fr 1fr" gap={4} py={4}>
              {data?.searchGig?.map((gig: Gig) => (
                <GigResult gig={gig} key={gig._id} />
              ))}
              {!data.searchGig && <>No gigs found for {getValues('artist')}! Maybe they're taking a break!?</>}
            </Grid>
          </Box>
        </Fade>
      )}
    </Box>
  )
}

export default Search
