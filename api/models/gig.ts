import mongoose from 'mongoose'

const Schema = mongoose.Schema
const SchemaTypes = mongoose.Schema.Types

const gigSchema = new Schema({
  ticketmasterId: { type: String },
  artist: {
    name: { type: String },
    image: { type: String },
    genre: { type: String },
    subGenre: { type: String },
  },
  date: { type: SchemaTypes.Mixed },
  info: { type: String },
  venue: {
    location: { type: SchemaTypes.Mixed },
    name: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    city: { type: String },
    country: { type: String },
  },
  lineup: {
    name: { type: String },
    image: { type: String },
    genre: { type: String },
    subGenre: { type: String },
  },
  festival: {
    start_date: { type: String },
    end_date: { type: String },
  },
  userId: { type: String },
})

export const Gig = mongoose.model('Gig', gigSchema)
