import React from 'react'
import './featuredInfo.css';
import {ArrowDownward,ArrowUpward} from '@material-ui/icons'


export default function featuredInfo() {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Revenue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$2,653</span>
                    <span className="featuredMoneyRate">-11.4 <ArrowDownward className="featuredIcon negative"/></span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$2,763</span>
                    <span className="featuredMoneyRate">-7.4 <ArrowDownward className="featuredIcon negative"/></span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$2,003</span>
                    <span className="featuredMoneyRate">+8.5 <ArrowUpward className="featuredIcon positive"/></span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    )
}
