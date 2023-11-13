"use client"
import { NavBar } from '@/components/NavBar';
import Dashboard from '@/components/brand/dashboard';
import { BrandCreate } from '@/components/brand/select/add-brand';
import { SelectBrand } from '@/components/brand/select/select-brand';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link';

const DashboardPage = ({ }) => {
    return (
        <div className='flex flex-col min-w-screen justify-center'>
            <NavBar />
            <div className='flex flex-col justify-center'>
                <Dialog open={true} >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Select or Create your Brand Profile</DialogTitle>
                            <div className='flex pt-7 justify-center gap-3'>
                                <Link href="/">
                                    <Button className='flex gap-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                        Go Home</Button>
                                </Link>
                                <BrandCreate />
                                <SelectBrand />
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Dashboard />
            </div>
        </div>
    );
}

export default DashboardPage;