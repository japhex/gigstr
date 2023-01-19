import mongoose from 'mongoose'

const Schema = mongoose.Schema
const SchemaTypes = mongoose.Schema.Types

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

export const Gig = mongoose.model('Gig', gigSchema)
