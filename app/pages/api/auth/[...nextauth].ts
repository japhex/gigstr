import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import jwt from 'jsonwebtoken'
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
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const client = await clientPromise
      const usersCollection = client.db().collection('users')

      await usersCollection.updateOne(
        { email: user.email },
        {
          $set: { providerId: user.id },
        }
      )
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
      }

      return token
    },
    async session({ session, token, user }) {
      const encodedToken = jwt.sign(token, process.env.SECRET, { algorithm: 'HS256' })
      session.accessToken = token.accessToken
      session.user.id = token.sub
      session.user.providerId = token.sub
      session.token = encodedToken

      return session
    },
  },
  pages: { signIn: '/auth/signin' },
}

export default NextAuth(authOptions)