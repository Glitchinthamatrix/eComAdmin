import "./chart.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Chart({lineDataKey,xAxisDataKey,yAxisDataKey,title,grid,data}) {

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
            <XAxis dataKey={xAxisDataKey} stroke="#5550bd"/>
            <YAxis dataKey={yAxisDataKey} stroke="#5550bd" />
            <Line type="monotone" dataKey={lineDataKey} stroke="#5550bd"/>
            <Tooltip/>
            {grid?<CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>:''}
            <Legend/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
