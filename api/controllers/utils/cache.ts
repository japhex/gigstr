import { SchemaFieldTypes } from 'redis'

import { redisClient } from '../../app'

export const createGigsIndex = async () => {
  try {
    await redisClient.ft.create(
      // @ts-ignore
      `idx:gigs`,
      {
        '$.artist.genre': {
          type: SchemaFieldTypes.TEXT,
          AS: 'genre',
        },
        '$.artist.subGenre': {
          type: SchemaFieldTypes.TEXT,
          AS: 'subGenre',
        },
        '$.gigYear': {
          type: SchemaFieldTypes.TEXT,
          AS: 'gigYear',
        },
        '$.gigMonth': {
          type: SchemaFieldTypes.TEXT,
          AS: 'gigMonth',
        },
        '$.timestamp': {
          type: SchemaFieldTypes.NUMERIC,
          sortable: true,
          AS: 'timestamp',
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
    // console.log(e)
  }
}

export const getValue = ({ index }) => index?.documents.map(doc => doc.value)
