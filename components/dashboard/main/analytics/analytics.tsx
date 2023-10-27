import LineChartComponent from '@/components/chart/linechart';
import BarChartComponent from '@/components/chart/barchart';
import { Card, Metric, Text } from '@tremor/react';
import React from 'react'

interface analyticsProps {

}

const AnalyticsSection: React.FC<analyticsProps> = ({ }) => {
    return (
        <div>
            <div className='flex justify-start flex-wrap gap-3 mt-2 z-0'>
                <Card className="max-w-xs space-y-2">
                    <Text>Followers</Text>
                    <Metric>34</Metric>
                </Card>
                <Card className="max-w-xs space-y-2">
                    <Text>Gained (1d)</Text>
                    <Metric>8%</Metric>
                </Card>
                <Card className="max-w-xs space-y-2">
                    <Text>Likes (1d)</Text>
                    <Metric>112</Metric>
                </Card>
            </div>
            <div className='flex flex-col gap-4 mt-[1rem]'>
                <LineChartComponent />
                <BarChartComponent />
            </div>
        </div>
    );
}

export default AnalyticsSection;