import React from 'react';
import './Home.css';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo.jsx';
import Chart from '../../components/charts/Chart.jsx';
import {userData} from '../../dummyData.js'
import WidgetSm from '../../components/widgetSm/WidgetSm.jsx';
import WidgetLg from '../../components/widgetLg/WidgetLg.jsx';

export default function Home() {
    return (
        <div className="home">
            <FeaturedInfo/>
            <Chart data={userData} xAxisDataKey="name" yAxisDataKey="Active Users" lineDataKey="Active Users" title="Users Analytics" grid={true}/>
            <div className="homeWidgets">
                <WidgetSm/>
                <WidgetLg/>
            </div>
        </div>
    )
}
