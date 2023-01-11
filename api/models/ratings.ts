import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ratingsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  gig: { type: Schema.Types.ObjectId, ref: 'Gig' },
  rating: Number,
})

export const Ratings = mongoose.model('Ratings', ratingsSchema)
