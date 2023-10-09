import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { redirect } from "next/navigation"
import router from "next/router"
export default function Header() {
    const {data: session } = useSession()
    return(
    <div className="z-10 border-b border-black shadow-md border-radius-50 w-full items-center justify-between font-mono text-sm lg:flex bg-zinc-100 p-4 fixed top-0">
        <h1 className='text-4xl font-bold cursor-pointer' onClick={() => router.push('/')}>Bad App</h1>
        <div className="ml-auto flex space-x-4">
            {session ? (
            <a onClick={() => signOut()} className="hover:font-bold">Logout</a>
            ) : (
            <Link href="/login" className="hover:font-bold">Login</Link>
            )}
            <Link href="secretPage" className="hover:font-bold">Account</Link>

        </div>
    </div>
  )
}