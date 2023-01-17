import { format } from 'date-fns'

export const gigStartDate = date => format(new Date(date?.start), 'MMM do yyyy')
