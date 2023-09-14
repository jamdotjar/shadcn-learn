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
import WeatherCard from '@/components/WeatherCard'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10  border-radius-50 w-full items-center justify-between font-mono text-sm lg:flex bg-zinc-100 p-4">
        <h1 className='text-4xl font-bold'>Bad App</h1>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
hello
        </div>
      </div>
      <div className="mx-auto w-4/5 text-center flex items-center justify-center h-screen">
      <WeatherCard/>
      </div>


    </main>
  )
}
