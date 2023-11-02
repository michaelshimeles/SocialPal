"use client"
import { BrandCreate } from '@/components/dashboard/brand/add-brand';
import { SelectBrand } from '@/components/dashboard/brand/select-brand';

const DashboardPage = ({ }) => {
    return (
        <div className='flex min-w-screen justify-center my-[3rem] gap-3'>
            <BrandCreate />
            <SelectBrand />
        </div>
    );
}

export default DashboardPage;