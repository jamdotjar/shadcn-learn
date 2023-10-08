import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import '../components/globals.css'

export default function LoginPage() {
  const router = useRouter()
  const callbackUrl = router.query.callbackUrl || '/'

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen mx-auto max-w-xl">
      <div className="p-10 border border-gray-400 m-auto text-center rounded shadow-xl">
        <p className='mb-14'>
          Welcome to BadApp. you can sign in to access more features.
        </p>
        <Button onClick={() => signIn('github', { callbackUrl: callbackUrl.toString() })}>Sign in with GitHub</Button>
      </div>
    </div>
  )
}