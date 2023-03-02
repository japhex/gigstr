import mongoose, { Document } from 'mongoose'

const Schema = mongoose.Schema

export interface IUser extends Document {
  name: string
  email: string
  providerId: string
  image: string
  emailVerified: string
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    providerId: { type: String, required: true },
    image: { type: String },
    emailVerified: { type: String },
  },
  {
    timestamps: true,
  }
)

export const User = mongoose.model('User', userSchema)
