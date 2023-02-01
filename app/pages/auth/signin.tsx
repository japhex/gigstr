import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react'

interface Props {
  providers: ClientSafeProvider[]
}

export default function SignIn({ providers }: Props) {
  return (
    <>
      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}> Sign in with {provider.name}</button>
        </div>
      ))}
    </>
  )
}

export async function getStaticProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
