"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from "next/link"
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Header from '@/components/Header'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import{ WeatherDisplay } from '../components/WeatherCard'

export default function Home() {
  const { data: session } = useSession()

  return (
    <>
    <Header/>
    <main className="flex min-h-screen flex-col items-center justify-between mt-20">
      
      <div className=' w-3/5 h-screen mx-auto flex justify-center'>
        <WeatherDisplay/>
      </div>
    </main>
    </>
   
  )
}
