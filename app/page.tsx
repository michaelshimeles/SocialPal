"use client"
import { NavBar } from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-w-screen flex-col items-center justify-between">
      <NavBar />
      <div className='flex flex-col text-center mt-[4rem] mb-7'>
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 text-sm leading-6 text-white ring-1 ring-gray-900/10 hover:ring-gray-900/20 bg-gradient-to-r from-violet-600 to-indigo-600">
            A lot of features are on hold due to Tiktok & IG API approval taking forever.
          </div>
        </div>
        <div className='flex justify-center text-center space-x-3'>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Hey Social Pal
          </h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-cog"><circle cx="12" cy="12" r="3" /><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5" /><path d="m15.7 10.4-.9.4" /><path d="m9.2 13.2-.9.4" /><path d="m13.6 15.7-.4-.9" /><path d="m10.8 9.2-.4-.9" /><path d="m15.7 13.5-.9-.4" /><path d="m9.2 10.9-.9-.4" /><path d="m10.5 15.7.4-.9" /><path d="m13.1 9.2.4-.9" /></svg>
        </div>
        <p className="leading-7 [&:not(:first-child)]:mt-3">
          An AI Social Media assistant design to help you grow your brands social
        </p>
        <Link href="/brand" className='mt-3'>
          <Button>Get Started</Button>
        </Link>
        <div className='mt-6'>
          <Image className='rounded-md border dark:border-gray-800 light:border-gray-400' src="/dashboard.png" width={800} height={100} alt='dashboard' />
        </div>
      </div>
    </main >
  )
}
