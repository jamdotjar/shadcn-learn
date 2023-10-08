import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import '../components/globals.css'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-auto max-w-2xl">
      <div className="m-auto text-center">
        <p>
          Logging in is more than just entering your credentials. It's a commitment, a promise, a handshake between you and the application. It's a mutual agreement that you are who you say you are, and in return, the application will remember you, cater to your preferences, and provide a personalized experience. 
          
          When you log in, you're not just unlocking access to features. You're stepping into a world that's been tailored for you. Your likes, your dislikes, your history, your future - all taken into account to provide an experience that's uniquely yours. 
          
          Logging in is the key to a world of possibilities. It's the first step on a journey of discovery. It's the beginning of a relationship between you and the digital world. So go ahead, log in. Embrace the possibilities. Welcome to your world.
        </p>
        <Button onClick={() => signIn('github')}>Sign in with GitHub</Button>
      </div>
    </div>
  )
}