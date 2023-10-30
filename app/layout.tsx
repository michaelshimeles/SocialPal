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
  title: 'Social Pal',
  description: 'Use Ai to ideate, plan, and schedule content 5x faster',
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
        <body className={GeistSans.className}>
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));

              window.fbAsyncInit = function() {
                FB.init({
                  appId: '{your-facebook-app-id}',
                  xfbml: true,
                  version: '{the-graph-api-version-for-your-app}'
                });

                FB.login(function(response) {
                  if (response.authResponse) {
                    console.log('Welcome! Fetching your information....');
                    FB.api('/me', { fields: 'name, email' }, function(response) {
                      document.getElementById("profile").innerHTML = "Good to see you, " + response.name + ". I see your email address is " + response.email;
                    });
                  } else {
                    console.log('User cancelled login or did not fully authorize.');
                  }
                });
              };
            `,
            }}
          ></script> */}
          <div id="fb-root"></div>
          <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0&appId=2319304708277666" nonce="P6Q9cTmd"></script>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NavBar />
              {children}
              <Toaster />
            </ThemeProvider>
          </Provider>
        </body>
      </html>
    </ClerkProvider >
  )
}