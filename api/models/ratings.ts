import mongoose, { Document } from 'mongoose'

const Schema = mongoose.Schema

export interface IRating extends Document {
  userId: string
  gigId: string
  rating: number
}

const ratingsSchema = new Schema(
  {
    userId: String,
    gigId: { type: Schema.Types.ObjectId, ref: 'Gig' },
    rating: Number,
  },
  {
    timestamps: true,
  }
)

export const Ratings = mongoose.model<IRating>('Ratings', ratingsSchema)
