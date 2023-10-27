"use client"
import { Profile } from "../Profile"
import { BrandSelect } from './brand'
import MainDashboard from "./main/Main"
import SheetDashboard from "./mobile/sheet"
import NavigationDashboard from "./nav/Navigation"
import LogoDashboard from "./Logo/Logo"

export default function Dashboard() {

  return (
    <div className="grid h-screen min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-zinc-100/40 lg:block dark:bg-zinc-800/40">
        <div className="flex flex-col gap-2">
          <LogoDashboard />
          <div className="flex-1">
            <NavigationDashboard />
          </div>
        </div>
      </div>
      <div className="flex flex-col overflow-auto">
        <header className="sticky top-0 flex h-[60px] items-center border-b bg-zinc-100/40 px-6 dark:bg-zinc-800/40">
          <SheetDashboard />
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial my-5">
              <BrandSelect />
            </form>
            <Profile />
          </div>
        </header>
        <MainDashboard />
      </div>
    </div>
  )
}
