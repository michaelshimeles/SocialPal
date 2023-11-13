import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { NavBar } from '@/components/NavBar'
import { GeistSans, GeistMono } from 'geist/font'
import Provider from '@/utils/provider'
import Script from 'next/script'
const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  keywords: ['Social Pal', 'Social Pal AI', 'Hey Social Pal'],
  openGraph: {
    title: 'Social Pal',
    description: 'An AI Social Media assistant design to help you grow your brands social',
    images: ['/cover.png']
  }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="facebook-domain-verification" content="ubi5ckw8aon6oqf4e8qt2ooin860x3" />
        </head>
        <body className={GeistSans.className} >
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </Provider>
        </body>
      </html>
    </ClerkProvider >
  )
}