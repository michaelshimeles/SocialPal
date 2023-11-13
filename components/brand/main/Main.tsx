import { useSearchParams } from 'next/navigation';
import AnalyticsSection from './analytics/analytics';
import Pillars from './pillars/Pillars';
import Scheduler from './scheduler/Scheduler';
import SettingsDashboard from './settings/Settings';
import Captions from './captions/Captions';
import Assistant from './assistant/Assistant';


const MainDashboard = () => {

    const searchParams = useSearchParams()

    const search = searchParams.get('click')

    return (
        <main className="flex flex-1 flex-col gap-4 md:gap-8">
            {search === "pillar" && <Pillars />}
            {search === "scheduler" && <Scheduler />}
            {search === "assistant" && <Assistant />}
            {search === "captions" && <Captions />}
            {/* {search === "analytics" && <AnalyticsSection />} */}
            {search === "settings" && <SettingsDashboard />}
        </main>
    );
}

export default MainDashboard;