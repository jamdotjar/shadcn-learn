import { getSession, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import 'components/globals.css'
import Header from '@/components/Header'

export default function SecretPage() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Loading...</div>
  }

  return(
    <> <Header/>
  <div className='mt-20 flex flex-col items-center justify-center'>
    <h2 className='text-2xl font-bold mb-4'>Account Information</h2>
    <p className='text-lg mb-2'>Email: {session?.user?.email}</p>
    <p className='text-lg mb-2'>Username: {session?.user?.name}</p>
    <img className='w-24 h-24 rounded-full mb-4' src={session?.user?.image || ''} alt="Profile picture" />
    <p className='text-lg'>Welcome to your account page!</p>
  </div>
  </>
 
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: `/login?callbackUrl=${process.env.NEXT_PUBLIC_BASE_URL}${context.resolvedUrl}`,
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}