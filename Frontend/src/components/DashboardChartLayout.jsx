import React, { useState } from "react";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, Legend } from "recharts";

export default function DashboardChartLayout() {
  const [data, setData] = useState([
    { Happy: 0.423, Sad: 0.698, Neutral: 0 },
    { Happy: 0.256, Sad: 0.549, Neutral: 0.65 },
    {  Happy: 0.256, Sad: 0.549, Neutral: 0.145 },
  ]);

  return (
    <AreaChart
      width={1000}
      height={500}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="Happy" stroke="green" fill="green" fillOpacity={0.2} />
      <Area type="monotone" dataKey="Sad" stroke="red" fill="red" fillOpacity={0.2} />
      <Area type="monotone" dataKey="Neutral" stroke="yellow" fill="yellow" fillOpacity={0.2} />
    </AreaChart>
  );
}
