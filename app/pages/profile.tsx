import { useSession } from 'next-auth/react'

export default function MePage() {
  const { data } = useSession()

  console.log(data)

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
