import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  providerId: { type: String, required: true },
  image: { type: String },
  emailVerified: { type: String },
})

export const User = mongoose.model('User', userSchema)
