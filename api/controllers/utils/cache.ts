import { getMonth, getYear } from 'date-fns'
import { SchemaFieldTypes } from 'redis'

import { redisClient } from '../../app'

export const createGigsIndex = async () => {
  try {
    await redisClient.ft.create(
      `idx:gigs`,
      {
        '$.artist.genre': {
          type: SchemaFieldTypes.TEXT,
          AS: 'genre',
        },
        '$.gigYear': {
          type: SchemaFieldTypes.TEXT,
          AS: 'gigYear',
        },
        '$.gigMonth': {
          type: SchemaFieldTypes.TEXT,
          AS: 'gigMonth',
        },
        '$.userId': {
          type: SchemaFieldTypes.TEXT,
          AS: 'userId',
        },
      },
      {
        ON: 'JSON',
        PREFIX: 'GIGS:',
      }
    )
  } catch (e) {
    console.error('Could not create index idx:gigs')
  }
}

export const getValue = ({ index }) => index?.documents.map(doc => doc.value)

export const insertGig = async gig => {
  await redisClient.json.set(`GIGS:${gig._id}`, '$', {
    ...gig,
    gigMonth: `${getMonth(gig.date.start)}`,
    gigYear: `${getYear(gig.date.start)}`,
  })
}
