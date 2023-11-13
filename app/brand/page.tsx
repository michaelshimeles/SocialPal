"use client"
import { NavBar } from '@/components/NavBar';
import Dashboard from '@/components/brand/dashboard';
import { BrandCreate } from '@/components/brand/select/add-brand';
import { SelectBrand } from '@/components/brand/select/select-brand';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

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