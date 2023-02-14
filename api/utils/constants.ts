import { getUnixTime } from 'date-fns'

export const isProduction = process.env.NODE_ENV === 'production'
export const today = getUnixTime(new Date())
