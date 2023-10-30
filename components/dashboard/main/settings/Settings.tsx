import React from 'react';
import { Button } from '@/components/ui/button';
import { Instagram, Clapperboard } from 'lucide-react';
interface SettingsProps {

}

const SettingsDashboard: React.FC<SettingsProps> = ({ }) => {


    return (
        <div className='flex flex-col space-y-6'>
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Settings
            </h2>
            <div className='flex space-x-2'>
                <Button className='flex gap-2'>
                    <Clapperboard />
                    Connect Tiktok
                </Button>
                <Button className='flex gap-2'>
                    <Instagram />
                    Connect Instagram
                </Button>
            </div>
        </div>
    );
}

export default SettingsDashboard;