import Image from 'next/image'
export default function Home() {
  return (
    <main className="flex min-w-screen flex-col items-center justify-between">
      <div className='flex flex-col text-center mt-[5rem]'>
        <div className='flex justify-center text-center space-x-3'>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            smm AI
          </h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-cog"><circle cx="12" cy="12" r="3" /><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5" /><path d="m15.7 10.4-.9.4" /><path d="m9.2 13.2-.9.4" /><path d="m13.6 15.7-.4-.9" /><path d="m10.8 9.2-.4-.9" /><path d="m15.7 13.5-.9-.4" /><path d="m9.2 10.9-.9-.4" /><path d="m10.5 15.7.4-.9" /><path d="m13.1 9.2.4-.9" /></svg>
        </div>
        <p className="leading-7 [&:not(:first-child)]:mt-2">
          Get 5 Social Media Managers for the price of a McChicken Combo
        </p>
        <Image src="/dashboard.png" width={900} height={400} alt='dashboard' className='mt-[2rem] rounded-md drop-shadow-md'/>
      </div>
    </main >
  )
}
