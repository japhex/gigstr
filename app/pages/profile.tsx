import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'
import { useSession } from 'next-auth/react'

import { authOptions } from './api/auth/[...nextauth]'

export default function Profile() {
  const { data } = useSession()

  return <>{data?.user?.name}</>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  }
}
