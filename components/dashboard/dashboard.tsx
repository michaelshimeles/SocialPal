"use client"
import { useSearchParams } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Profile } from "../Profile"
import { BrandSelect } from './brand'
import { Card, Text, Metric } from "@tremor/react";
import LineChartComponent from '../chart/linechart'
import BarChartComponent from '../chart/barchart'

export default function Dashboard() {
  const searchParams = useSearchParams()

  const search = searchParams.get('click')

  return (
    <div className="grid h-screen min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-zinc-100/40 lg:block dark:bg-zinc-800/40">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
              <svg
                className=" h-6 w-6"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                <path d="M12 3v6" />
              </svg>
              <span className="">AI Agency</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              {search === null ?
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-50 bg-zinc-100"
                  href="/dashboard"
                >
                  <svg
                    className=" h-4 w-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect height="18" rx="2" width="18" x="3" y="3" />
                    <path d="M9 14v1" />
                    <path d="M9 19v2" />
                    <path d="M9 3v2" />
                    <path d="M9 9v1" />
                  </svg>
                  Content Pillars
                </Link> : <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  href="/dashboard"
                >
                  <svg
                    className=" h-4 w-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect height="18" rx="2" width="18" x="3" y="3" />
                    <path d="M9 14v1" />
                    <path d="M9 19v2" />
                    <path d="M9 3v2" />
                    <path d="M9 9v1" />
                  </svg>
                  Content Pillars
                </Link>}
              {search !== "scheduler" ? <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                href="?click=scheduler"
              >
                <svg
                  className=" h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                Scheduler
              </Link> : <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-50 bg-zinc-100"
                href="?click=scheduler"
              >
                <svg
                  className=" h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                Scheduler
              </Link>}
              {search !== "analytics" ? <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                href="?click=analytics"
              >
                <svg
                  className=" h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                Analytics
              </Link> :
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-50 bg-zinc-100"
                  href="?click=analytics"
                >
                  <svg
                    className=" h-4 w-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                  Analytics
                </Link>}
              {search !== "settings" ? <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                href="?click=settings"
              >
                <svg
                  className=" h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 7h-9" />
                  <path d="M14 17H5" />
                  <circle cx="17" cy="17" r="3" />
                  <circle cx="7" cy="7" r="3" />
                </svg>
                Settings
              </Link> : <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-50 bg-zinc-100"
                href="?click=settings"
              >
                <svg
                  className=" h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 7h-9" />
                  <path d="M14 17H5" />
                  <circle cx="17" cy="17" r="3" />
                  <circle cx="7" cy="7" r="3" />
                </svg>
                Settings
              </Link>}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col overflow-auto">
        <header className="sticky top-0 flex h-[60px] items-center border-b bg-zinc-100/40 px-6 dark:bg-zinc-800/40">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="-translate-x-1 lg:hidden" size="icon" variant="ghost">
                <svg
                  className=" h-5 w-5"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
                  <line x1="15" x2="15" y1="3" y2="21" />
                </svg>
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[280px] px-0" side="left">
              <div className="flex flex-col gap-2">
                <div className="flex h-[60px] items-center px-6">
                  <Link className="flex items-center gap-2 font-semibold" href="#">
                    <svg
                      className=" h-6 w-6"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                      <path d="M12 3v6" />
                    </svg>
                    <span className="">Acme Inc</span>
                  </Link>
                </div>
                <div className="flex-1">
                  <nav className="grid items-start px-4 text-sm font-medium">
                    <Link
                      className="flex items-center gap-3 rounded-lg bg-zinc-100 px-3 py-2 text-zinc-900 transition-all hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-50"
                      href="#"
                    >
                      <svg
                        className=" h-4 w-4"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect height="18" rx="2" width="18" x="3" y="3" />
                        <path d="M9 14v1" />
                        <path d="M9 19v2" />
                        <path d="M9 3v2" />
                        <path d="M9 9v1" />
                      </svg>
                      Dashboard
                    </Link>
                    <Link
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                      href="#"
                    >
                      <svg
                        className=" h-4 w-4"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="8" cy="21" r="1" />
                        <circle cx="19" cy="21" r="1" />
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                      </svg>
                      Orders
                    </Link>
                    <Link
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                      href="#"
                    >
                      <svg
                        className=" h-4 w-4"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m7.5 4.27 9 5.15" />
                        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                        <path d="m3.3 7 8.7 5 8.7-5" />
                        <path d="M12 22V12" />
                      </svg>
                      Products
                    </Link>
                    <Link
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                      href="#"
                    >
                      <svg
                        className=" h-4 w-4"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      Customers
                    </Link>
                    <Link
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                      href="#"
                    >
                      <svg
                        className=" h-4 w-4"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 3v18h18" />
                        <path d="m19 9-5 5-4-4-3 3" />
                      </svg>
                      Analytics
                    </Link>
                    <Link
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                      href="#"
                    >
                      <svg
                        className=" h-4 w-4"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <path d="M12 17h.01" />
                      </svg>
                      Support
                    </Link>
                    <Link
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                      href="#"
                    >
                      <svg
                        className=" h-4 w-4"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20 7h-9" />
                        <path d="M14 17H5" />
                        <circle cx="17" cy="17" r="3" />
                        <circle cx="7" cy="7" r="3" />
                      </svg>
                      Settings
                    </Link>
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial my-5">
              <BrandSelect />
            </form>
            <Profile />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {search === null && <div><p>Pillars</p></div>}
          {search === "scheduler" && <div><p>Scheduler</p></div>}
          {search === "analytics" &&
            <div>
              <div className='flex justify-start flex-wrap gap-3'>
                <Card className="max-w-xs space-y-2">
                  <Text>Followers</Text>
                  <Metric>34</Metric>
                </Card>
                <Card className="max-w-xs space-y-2">
                  <Text>Gained (1d)</Text>
                  <Metric>8%</Metric>
                </Card>
                <Card className="max-w-xs space-y-2">
                  <Text>Likes (1d)</Text>
                  <Metric>112</Metric>
                </Card>
              </div>
              <div className='flex flex-col gap-4 mt-[1rem]'>
                <LineChartComponent />
                <BarChartComponent />
              </div>
            </div>}
          {search === "settings" && <div><p>Settings</p></div>}
        </main>
      </div>
    </div>
  )
}
