import { useToast } from '@/components/ui/use-toast';
import { UploadButton } from '@/utils/uploadthing';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import AnalyticsSection from './analytics/analytics';
import Scheduler from './scheduler/Scheduler';
import Pillars from './pillars/Pillars';
import SettingsDashboard from './settings/Settings';

interface MainProps {

}

const MainDashboard: React.FC<MainProps> = ({ }) => {
    const { toast } = useToast()

    const searchParams = useSearchParams()

    const search = searchParams.get('click')

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            {search === null && <Pillars />}
            {search === "scheduler" && <Scheduler />}
            {search === "analytics" && <AnalyticsSection />}
            {search === "settings" && <SettingsDashboard />}
        </main>
    );
}

export default MainDashboard;