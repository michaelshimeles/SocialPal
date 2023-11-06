"use client"
import { useGetBrandsById } from "@/utils/hooks/useGetBrandsById"
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from "react"
import LogoDashboard from "./logo/LogoDashboard"
import MainDashboard from "./main/Main"
import SheetDashboard from "./mobile/sheet"
import NavigationDashboard from "./nav/Navigation"
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const searchParams = useSearchParams()
  const search = searchParams.get('click')
  const pathname = usePathname()
  const brandId = pathname.split("/brand/")[1]
  const router = useRouter()

  useEffect(() => {
    const authorizationCheck = async () => {
      const response = await fetch("/api/auth/access", {
        method: "POST",
        body: JSON.stringify({
          brandId
        })
      })

      const result = await response.json()
      if (!result) {
        router.push('/brand')
      }
      return result
    }

    authorizationCheck()
  }, [brandId])

  const { data, error, isLoading } = useGetBrandsById(brandId)
  return (
    <div className="grid h-screen min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-zinc-100/40 lg:block dark:bg-zinc-800/40">
        <div className="flex flex-col gap-2">
          <LogoDashboard />
          <div className="flex-1">
            <Suspense fallback={<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>}>
              <NavigationDashboard />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="flex flex-col overflow-auto">
        <header className="sticky top-0 flex min-h-[60px] items-center border-b bg-zinc-100/40 px-6 dark:bg-zinc-800/40">
          <Suspense fallback={<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>}>
            <SheetDashboard />
          </Suspense>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <p>Welcome, {data?.[0]?.name}</p>
          </div>
        </header>
        {search === null && <div className="flex flex-col p-6 mt-[8px]">
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            How to use Social Pal
          </h2>
          <h3 className="mt-5 scroll-m-20 text-2xl font-semibold tracking-tight">
            Content Pillars
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-2">
            This is where you build out your brands content pillars, using our AI you&apos;ll get:
          </p>
          <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
            <li>A full month content plan</li>
            <li>Variety of content ideas</li>
            <li>Customized plan tailored to your brand</li>
          </ul>
          <p className="leading-7 [&:not(:first-child)]:mt-2">
            These content pillars will be the foundation on which you will create content to then schedule and post.
          </p>
          <h3 className="mt-5 scroll-m-20 text-2xl font-semibold tracking-tight">
            Scheduler
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-2">
            Here you can upload content (images & videos) to your brands TikTok and/or Instagram account to then schedule to post.
          </p>
          <h3 className="mt-5 scroll-m-20 text-2xl font-semibold tracking-tight">
            Analytics
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-2">
            Keep up with your brands social analytics. Track KPIs and analyze your brands growth with our easy to read analytics.
          </p>
        </div>}
        <Suspense fallback={<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>}>
          <MainDashboard />
        </Suspense>
      </div>
    </div>
  )
}
