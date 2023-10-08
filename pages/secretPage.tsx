import { getSession, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'

export default function secretPage() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Loading...</div>
  }

  return <div>Secret page for {session.user.email}</div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}