import { signIn } from 'next-auth/react'

export default function AccessDenied() {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <span
          onClick={async () => {
            await signIn()
          }}
        >
          You must be signed in to view this page
        </span>
      </p>
    </>
  )
}
