import { Gig } from '../../models/gig'

export const returnGigs = async (user, options = {}) => {
  const userGigs = [] // await UserGigs.find({ user: user.id })
  console.log(user)
  const gigs = await Gig.find({
    _id: { $in: userGigs.map(gig => gig.gig) },
    ...options,
  }).sort('date')

  return { userGigs, gigs }
}

export const getUserWithGigs = async user => {
  const { gigs } = await returnGigs(user)

  return {
    id: user._id,
    username: user.username,
    gigs,
  }
}
