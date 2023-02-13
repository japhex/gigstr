import mongoose, { Document } from 'mongoose'

const Schema = mongoose.Schema
const SchemaTypes = mongoose.Schema.Types

export interface IGig extends Document {
  ticketmasterId: string
  artist: {
    name: string
    image: string
    genre: string
    subGenre: string
  }
  date: {
    start: string
    end: string
    timestamp: string
  }
  info: string
  venue: {
    location: Record<string, any>
    name: string
    latitude: string
    longitude: string
    city: string
    country: string
  }
  lineup: [
    {
      name: string
      image: string
      genre: string
      subGenre: string
    }
  ]
  festival: {
    start_date: string
    end_date: string
  }
  userId: string
}

const gigSchema = new Schema(
  {
    ticketmasterId: { type: String },
    artist: {
      name: { type: String },
      image: { type: String },
      genre: { type: String },
      subGenre: { type: String },
    },
    date: {
      start: { type: SchemaTypes.Date },
      end: { type: SchemaTypes.Date },
      timestamp: { type: SchemaTypes.Number },
    },
    info: { type: String },
    venue: {
      location: { type: SchemaTypes.Mixed },
      name: { type: String },
      latitude: { type: String },
      longitude: { type: String },
      city: { type: String },
      country: { type: String },
    },
    lineup: [
      {
        name: { type: String },
        image: { type: String },
        genre: { type: String },
        subGenre: { type: String },
      },
    ],
    festival: {
      start_date: { type: SchemaTypes.Date },
      end_date: { type: SchemaTypes.Date },
    },
    userId: { type: String },
  },
  {
    timestamps: true,
  }
)

export const Gig = mongoose.model<IGig>('Gig', gigSchema)
