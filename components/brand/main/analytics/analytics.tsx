"use client"
import BarChartComponent from '@/components/chart/barchart';
import { Card, Metric, Text } from '@tremor/react';
import React from 'react'

const AnalyticsSection = ({ }) => {
    return (
        <div>
            <div className='flex justify-start flex-wrap gap-3 mt-2 z-0 p-4 md:p-6'>
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
            <div className='flex flex-col gap-4 p-4 md:p-6'>
                <BarChartComponent />
            </div>
        </div>
    );
}

export default AnalyticsSection;