import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import jwt from 'jsonwebtoken'
// @ts-ignore
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import SpotifyProvider from 'next-auth/providers/spotify'

import clientPromise from '../../../lib/mongo'

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    SpotifyProvider({
      // @ts-ignore
      clientId: process.env.SPOTIFY_ID,
      // @ts-ignore
      clientSecret: process.env.SPOTIFY_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  events: {
    // @ts-ignore
    async session(message) {
      // in session event update user after they initially auth for the first time and save their id
      // for jwt linking through api-routes
      const client = await clientPromise
      const usersCollection = client.db().collection('users')

      await usersCollection.updateOne(
        { email: message?.session?.user?.email },
        {
          $set: { providerId: message.token.id },
        }
      )
    },
  },
  callbacks: {
    // @ts-ignore
    async redirect({ baseUrl }) {
      return baseUrl
    },
    // @ts-ignore
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        // @ts-ignore
        token.id = profile?.id
      }

      return token
    },
    // @ts-ignore
    async session({ session, token }) {
      // @ts-ignore
      const encodedToken = jwt.sign(token, process.env.SECRET, { algorithm: 'HS256' })

      // @ts-ignore
      session.accessToken = token.accessToken
      // @ts-ignore
      session.user.id = token.sub
      // @ts-ignore
      session.user.providerId = token.sub
      // @ts-ignore
      session.token = encodedToken

      return session
    },
  },
  pages: { signIn: '/auth/signin' },
}
// @ts-ignore
export default NextAuth(authOptions)
