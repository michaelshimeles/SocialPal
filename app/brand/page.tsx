"use client"
import { NavBar } from '@/components/NavBar';
import { BrandCreate } from '@/components/brand/select/add-brand';
import { SelectBrand } from '@/components/brand/select/select-brand';

const DashboardPage = ({ }) => {
    return (
        <div className='flex flex-col min-w-screen justify-center'>
            <NavBar />
            <div className='flex justify-center my-[3rem] gap-3'>
                <BrandCreate />
                <SelectBrand />
            </div>
        </div>
    );
}

export default DashboardPage;