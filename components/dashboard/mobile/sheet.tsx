import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import NavigationDashboard from '../nav/Navigation';


const SheetDashboard = () => {  
    return (
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
                            <span className="">AI Agency</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <NavigationDashboard />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default SheetDashboard;