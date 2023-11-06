"use client"
import { BrandCreate } from '@/components/brand/select/add-brand';
import { SelectBrand } from '@/components/brand/select/select-brand';

const DashboardPage = ({ }) => {
    return (
        <div className='flex min-w-screen justify-center my-[3rem] gap-3'>
            <BrandCreate />
            <SelectBrand />
        </div>
    );
}

export default DashboardPage;