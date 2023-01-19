import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ratingsSchema = new Schema(
  {
    userId: String,
    // userId: { type: Schema.Types.ObjectId, ref: 'User' },
    gigId: { type: Schema.Types.ObjectId, ref: 'Gig' },
    rating: Number,
  },
  {
    timestamps: true,
  }
)

export const Ratings = mongoose.model('Ratings', ratingsSchema)
