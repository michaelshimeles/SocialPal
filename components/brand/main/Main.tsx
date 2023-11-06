import { useSearchParams } from 'next/navigation';
import AnalyticsSection from './analytics/analytics';
import Pillars from './pillars/Pillars';
import Scheduler from './scheduler/Scheduler';
import SettingsDashboard from './settings/Settings';


const MainDashboard = () => {

    const searchParams = useSearchParams()

    const search = searchParams.get('click')

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            {search === "pillar" && <Pillars />}
            {search === "scheduler" && <Scheduler />}
            {search === "analytics" && <AnalyticsSection />}
            {search === "settings" && <SettingsDashboard />}
        </main>
    );
}

export default MainDashboard;