import { Gig } from '@gql/graphql'
import { format } from 'date-fns'

export const gigStartDate = (date: Pick<Gig, 'date'>) => format(new Date(date?.start), 'MMM do yyyy')
