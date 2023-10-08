"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from "next/link"

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
import{ WeatherDisplay } from '@/components/WeatherCard'
import { DarkModeButton } from 'components/darkModeToggle.tsx';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="z-10  border-radius-50 w-full items-center justify-between font-mono text-sm lg:flex bg-zinc-100 dark:bg-gray-800 p-8">
        <h1 className='text-6xl font-bold'>Bad App</h1>
        <DarkModeButton />
      </div>
      <div className=' w-3/5 h-screen mx-auto '>
        <WeatherDisplay/>
      </div>
      



    </main>
  )
}

